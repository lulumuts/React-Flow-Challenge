import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Mention from '@tiptap/extension-mention';
import { filterExpressions } from '../../lib/expressionSuggestions';
import ExpressionSuggestionList from './ExpressionSuggestionList';

export default function TiptapValueField({ label = 'Value', editable = true, embedded = false }) {
  const [suggestionProps, setSuggestionProps] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const suggestionPropsRef = useRef(null);
  const selectedIndexRef = useRef(0);

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
          return `@${node.attrs.label ?? node.attrs.id}`;
        },
        suggestion: {
          char: '@',
          allowSpaces: true,
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
              if (!props || props.items.length === 0) return false;

              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setSelectedIndex((i) => Math.min(i + 1, props.items.length - 1));
                return true;
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault();
                setSelectedIndex((i) => Math.max(i - 1, 0));
                return true;
              }
              if (event.key === 'Enter') {
                event.preventDefault();
                const item = props.items[selectedIndexRef.current];
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

  const editorWrapper = (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        width: '100%',
        borderRadius: embedded ? 0 : 12,
        border: embedded ? 'none' : '1px solid rgba(0, 0, 0, 0.23)',
        minHeight: 40,
        backgroundColor: editable ? '#fff' : 'rgba(0, 0, 0, 0.04)',
        cursor: editable ? 'text' : 'not-allowed',
        padding: embedded ? 0 : undefined
      }}
    >
      <EditorContent editor={editor} />
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
        width: 248,
        padding: '8px 8px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 4
      }}
      className="nodrag"
    >
      <label style={{ fontSize: '0.8rem', minWidth: 40, flexShrink: 0, paddingTop: 8 }}>
        {label}
      </label>
      {editorWrapper}
      {suggestionProps &&
        createPortal(
          <ExpressionSuggestionList
            suggestionProps={suggestionProps}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            onClose={() => setSuggestionProps(null)}
          />,
          document.body
        )}
    </div>
  );
}
