import { useState } from 'react';
import { createPortal } from 'react-dom';
import { EditorContent } from '@tiptap/react';
import CloseIcon from '@mui/icons-material/Close';
import { useExpressionEditor } from '../../hooks/useExpressionEditor';
import ExpressionSuggestionList from '../organisms/ExpressionSuggestionList';
import { AtButton } from '../atoms';

const SuggestionListPortal = ({ suggestionProps, selectedIndex, setSelectedIndex, filteredItemsRef, onClose }) =>
  suggestionProps
    ? createPortal(
        <ExpressionSuggestionList
          suggestionProps={suggestionProps}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          filteredItemsRef={filteredItemsRef}
          onClose={onClose}
        />,
        document.body
      )
    : null;

export default function TiptapValueField({ label = 'Value', editable = true, embedded = false }) {
  const [savedOutput, setSavedOutput] = useState(null);

  const {
    editor,
    suggestionProps,
    setSuggestionProps,
    selectedIndex,
    setSelectedIndex,
    filteredItemsRef,
    hasValue,
    handleAtButtonClick
  } = useExpressionEditor(editable);

  const handleSubmit = () => {
    if (editor) {
      setSavedOutput(editor.getText());
      editor.commands.clearContent();
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    e.preventDefault();
    editor?.commands.clearContent();
    editor?.commands.focus();
  };

  const editorWrapper = (
    <div
      className={`tiptap-value-field ${embedded ? 'tiptap-value-field--embedded' : ''} ${!editable ? 'tiptap-value-field--disabled' : ''}`}
    >
      <div className="tiptap-value-scroll" style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <EditorContent editor={editor} />
      </div>
      {!embedded && (
        <div className="tiptap-value-field__actions nodrag">
          {hasValue ? (
            <button
              type="button"
              className="nodrag tiptap-value-field__clear"
              tabIndex={-1}
              onClick={handleClear}
              onMouseDown={(e) => e.stopPropagation()}
              title="Clear value"
            >
              <CloseIcon sx={{ fontSize: 16, pointerEvents: 'none' }} />
            </button>
          ) : (
            <AtButton className="nodrag" onClick={handleAtButtonClick} />
          )}
        </div>
      )}
    </div>
  );

  if (embedded) {
    return (
      <>
        {editorWrapper}
        <SuggestionListPortal
          suggestionProps={suggestionProps}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          filteredItemsRef={filteredItemsRef}
          onClose={() => setSuggestionProps(null)}
        />
      </>
    );
  }

  return (
    <div className="tiptap-value-field-standalone nodrag">
      <div className="tiptap-value-field-standalone__content">
        <div className="tiptap-value-field-standalone__row">
          <label className="tiptap-value-field-standalone__label">{label}</label>
          <div className="tiptap-value-field-standalone__editor">{editorWrapper}</div>
        </div>
        {hasValue && (
          <div className="tiptap-value-field-standalone__submit-row">
            <span className="tiptap-value-field-standalone__spacer" />
            <button
              type="button"
              className="tiptap-value-field-standalone__submit"
              onClick={handleSubmit}
              disabled={!editor}
            >
              Submit
            </button>
          </div>
        )}
      </div>
      {savedOutput != null && savedOutput !== '' && (
        <div className="tiptap-value-field-standalone__output">
          <div className="tiptap-value-field-standalone__output-label">Output</div>
          {savedOutput}
        </div>
      )}
      <SuggestionListPortal
        suggestionProps={suggestionProps}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        filteredItemsRef={filteredItemsRef}
        onClose={() => setSuggestionProps(null)}
      />
    </div>
  );
}
