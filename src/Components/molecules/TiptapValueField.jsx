import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Mention from '@tiptap/extension-mention';
import { filterExpressions } from '../../lib/expressionSuggestions';
import ExpressionSuggestionList from './ExpressionSuggestionList';
import { AtButton } from '../atoms';
import CloseIcon from '@mui/icons-material/Close';

export default function TiptapValueField({ label = 'Value', editable = true, embedded = false }) {
  const [suggestionProps, setSuggestionProps] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [savedOutput, setSavedOutput] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isClearButtonHovered, setIsClearButtonHovered] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const suggestionPropsRef = useRef(null);
  const selectedIndexRef = useRef(0);
  const filteredItemsRef = useRef(null);

  useEffect(() => {
    suggestionPropsRef.current = suggestionProps;
    selectedIndexRef.current = selectedIndex;
  }, [suggestionProps, selectedIndex]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: 'expression-mention'
        },
        renderText({ node }) {
          return `@${node.attrs.id ?? node.attrs.label}`;
        },
        renderHTML({ node, suggestion, options }) {
          const char = suggestion?.char ?? '@';
          const text = node.attrs.id ?? node.attrs.label ?? '';
          return [
            'span',
            options.HTMLAttributes ?? {},
            `${char}${text}`
          ];
        },
        suggestion: {
          char: '@',
          allowSpaces: true,
          allowedPrefixes: null,
          items: ({ query }) => filterExpressions(query),
          render: () => ({
            onStart: (props) => {
              suggestionPropsRef.current = props;
              setSuggestionProps(props);
              setSelectedIndex(0);
            },
            onUpdate: (props) => {
              suggestionPropsRef.current = props;
              setSuggestionProps(props);
            },
            onExit: () => {
              suggestionPropsRef.current = null;
              setSuggestionProps(null);
            },
            onKeyDown: ({ event }) => {
              const props = suggestionPropsRef.current;
              const items = (filteredItemsRef.current || props?.items) ?? [];
              if (!props || items.length === 0) return false;

              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setSelectedIndex((i) => Math.min(i + 1, items.length - 1));
                return true;
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault();
                setSelectedIndex((i) => Math.max(i - 1, 0));
                return true;
              }
              if (event.key === 'Enter') {
                event.preventDefault();
                const item = items[selectedIndexRef.current];
                if (item) {
                  props.command(item);
                  setSuggestionProps(null);
                }
                return true;
              }
              return false;
            }
          })
        }
      })
    ],
    content: '',
    editable: true,
    editorProps: {
      attributes: {
        class: 'tiptap-value-content'
      }
    },
    autofocus: false
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);

  useEffect(() => {
    if (!editor) return;
    const checkHasValue = () => {
      let hasMention = false;
      editor.state.doc.descendants((node) => {
        if (node.type.name === 'mention') {
          hasMention = true;
          return false;
        }
      });
      setHasValue(hasMention);
    };
    editor.on('update', checkHasValue);
    checkHasValue();
    return () => editor.off('update', checkHasValue);
  }, [editor]);

  const handleSubmit = () => {
    if (editor) {
      const text = editor.getText();
      setSavedOutput(text);
      editor.commands.clearContent();
    }
  };

  const handleAtButtonClick = (e) => {
    e.preventDefault();
    if (!editor || !editable) return;

    editor.commands.focus();

    requestAnimationFrame(() => {
      const from = editor.state.selection.from;
      editor.chain().insertContentAt(from, '@').run();

      const range = { from, to: from + 1 };
      const items = filterExpressions('');
      const coords = editor.view.coordsAtPos(range.to);

      setSuggestionProps({
        editor,
        range,
        query: '',
        text: '@',
        items,
        command: (item) => {
          editor
            .chain()
            .focus()
            .insertContentAt(range, [
              { type: 'mention', attrs: { ...item, mentionSuggestionChar: '@' } },
              { type: 'text', text: ' ' }
            ])
            .run();
          setSuggestionProps(null);
        },
        clientRect: () =>
          new DOMRect(coords.left, coords.top, coords.right - coords.left, coords.bottom - coords.top)
      });
      setSelectedIndex(0);
    });
  };

  const editorWrapper = (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        borderRadius: embedded ? 0 : 12,
        border: embedded ? 'none' : '1px solid rgba(0, 0, 0, 0.23)',
        height: embedded ? undefined : undefined,
        minHeight: 48,
        backgroundColor: editable ? '#fff' : 'rgba(0, 0, 0, 0.04)',
        cursor: editable ? 'text' : 'not-allowed',
        padding: embedded ? 0 : undefined,
        overflow: 'hidden'
      }}
    >
      <div
        className="tiptap-value-scroll"
        style={{
          flex: 1,
          minWidth: 0,
          position: 'relative',
          zIndex: 1
        }}
      >
        <EditorContent editor={editor} />
      </div>
      {!embedded && (
        <div
          className="nodrag"
          style={{
            flexShrink: 0,
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            marginRight: 4
          }}
        >
          {hasValue ? (
            <button
              type="button"
              className="nodrag"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                editor?.commands.clearContent();
                editor?.commands.focus();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseEnter={() => setIsClearButtonHovered(true)}
              onMouseLeave={() => setIsClearButtonHovered(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: isClearButtonHovered ? 'rgba(131, 80, 203, 0.12)' : 'transparent',
                border: 'none',
                color: 'rgba(0, 0, 0, 0.6)',
                cursor: 'pointer',
                padding: 0,
                pointerEvents: 'auto',
                appearance: 'none',
                position: 'relative',
                zIndex: 10,
                outline: 'none'
              }}
              title="Clear value"
            >
              <CloseIcon sx={{ fontSize: 16, pointerEvents: 'none' }} />
            </button>
          ) : (
            <AtButton
              className="nodrag"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleAtButtonClick(e);
              }}
            />
          )}
        </div>
      )}
    </div>
  );

  if (embedded) {
    return (
      <>
        {editorWrapper}
        {suggestionProps &&
          createPortal(
            <ExpressionSuggestionList
              suggestionProps={suggestionProps}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              filteredItemsRef={filteredItemsRef}
              onClose={() => setSuggestionProps(null)}
            />,
            document.body
          )}
      </>
    );
  }

  return (
    <div
      style={{
        width: 360,
        padding: '8px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}
      className="nodrag"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <label style={{ fontSize: '0.8rem', minWidth: 40, flexShrink: 0, opacity: 0.7 }}>
            {label}
          </label>
          <div style={{ flex: 1, minWidth: 0 }}>{editorWrapper}</div>
        </div>
        {hasValue && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16 }}>
            <span style={{ width: 40, flexShrink: 0 }} />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!editor}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              style={{
                flex: 1,
                height: 48,
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: isButtonHovered && editor ? '#fff' : '#8350cb',
                backgroundColor: isButtonHovered && editor ? '#8350cb' : 'transparent',
                border: '1px solid #8350cb',
                borderRadius: 12,
                cursor: editor ? 'pointer' : 'not-allowed',
                opacity: editor ? 1 : 0.6,
                boxSizing: 'border-box'
              }}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      {savedOutput != null && savedOutput !== '' && (
        <div
          style={{
            padding: 10,
            fontSize: '0.8rem',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            borderRadius: 8,
            color: '#333',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          <div style={{ fontSize: '0.7rem', opacity: 0.7, marginBottom: 4 }}>Output</div>
          {savedOutput}
        </div>
      )}
      {suggestionProps &&
        createPortal(
          <ExpressionSuggestionList
            suggestionProps={suggestionProps}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            filteredItemsRef={filteredItemsRef}
            onClose={() => setSuggestionProps(null)}
          />,
          document.body
        )}
    </div>
  );
}
