import { useEffect, useMemo, useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Mention from '@tiptap/extension-mention';
import { filterExpressions } from '../lib/expressionSuggestions';

/** Creates the Mention extension with Turn.io expression suggestions. */
function createMentionExtension({ suggestionPropsRef, setSuggestionProps, setSelectedIndex, selectedIndexRef, filteredItemsRef }) {
  return Mention.configure({
    HTMLAttributes: { class: 'expression-mention' },
    renderText({ node }) {
      return `@${node.attrs.id ?? node.attrs.label}`;
    },
    renderHTML({ node, suggestion, options }) {
      const char = suggestion?.char ?? '@';
      const text = node.attrs.id ?? node.attrs.label ?? '';
      return ['span', options.HTMLAttributes ?? {}, `${char}${text}`];
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
  });
}

/**
 * TipTap editor with @mention support for Turn.io expressions.
 * Returns editor, suggestion state, refs, and handlers.
 */
export function useExpressionEditor(editable = true) {
  const [suggestionProps, setSuggestionProps] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasValue, setHasValue] = useState(false);
  const suggestionPropsRef = useRef(null);
  const selectedIndexRef = useRef(0);
  const filteredItemsRef = useRef(null);

  useEffect(() => {
    suggestionPropsRef.current = suggestionProps;
    selectedIndexRef.current = selectedIndex;
  }, [suggestionProps, selectedIndex]);

  const mentionExtension = useMemo(
    () =>
      createMentionExtension({
        suggestionPropsRef,
        setSuggestionProps,
        setSelectedIndex,
        selectedIndexRef,
        filteredItemsRef
      }),
    [setSuggestionProps, setSelectedIndex]
  );

  const editor = useEditor({
    extensions: [StarterKit, mentionExtension],
    content: '',
    editable: true,
    editorProps: { attributes: { class: 'tiptap-value-content' } },
    autofocus: false
  });

  useEffect(() => {
    if (editor) editor.setEditable(editable);
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

  return {
    editor,
    suggestionProps,
    setSuggestionProps,
    selectedIndex,
    setSelectedIndex,
    filteredItemsRef,
    hasValue,
    handleAtButtonClick
  };
}
