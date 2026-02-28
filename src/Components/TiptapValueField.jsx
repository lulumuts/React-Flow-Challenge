import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function TiptapValueField({ label = 'Value', editable = true }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editable,
    editorProps: {
      attributes: {
        class: 'tiptap-value-content'
      }
    }
  });

  useEffect(() => {
    if (editor && editor.isEditable !== editable) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);

  return (
    <div
      style={{
        width: 232,
        padding: 8,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8
      }}
      className="nodrag"
    >
      <label style={{ fontSize: '0.8rem', minWidth: 48, flexShrink: 0, paddingTop: 8 }}>
        {label}
      </label>
      <div
        sx={{
          flex: 1,
          borderRadius: '12px',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          minHeight: 40,
          backgroundColor: editable ? '#fff' : 'rgba(0, 0, 0, 0.04)',
          '&:hover': editable ? {} : {}
        }}
        style={{
          flex: 1,
          borderRadius: 12,
          border: '1px solid rgba(0, 0, 0, 0.23)',
          minHeight: 40,
          backgroundColor: editable ? '#fff' : 'rgba(0, 0, 0, 0.04)',
          cursor: editable ? 'text' : 'not-allowed'
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
