import { useEffect, useRef } from 'react';

/**
 * Floating suggestion list for Turn.io expressions.
 * Renders when suggestionProps is set, handles click and keyboard nav.
 */
export default function ExpressionSuggestionList({
  suggestionProps,
  selectedIndex,
  setSelectedIndex,
  onClose
}) {
  const listRef = useRef(null);

  const { items = [], command, clientRect } = suggestionProps || {};

  useEffect(() => {
    setSelectedIndex(0);
  }, [items, setSelectedIndex]);

  useEffect(() => {
    const el = listRef.current;
    if (el && selectedIndex >= 0 && items[selectedIndex]) {
      const itemEl = el.children[selectedIndex];
      itemEl?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex, items]);

  if (!suggestionProps || items.length === 0) return null;

  const rect = typeof clientRect === 'function' ? clientRect() : null;
  const style = rect
    ? {
        position: 'fixed',
        top: rect.bottom + 4,
        left: rect.left,
        zIndex: 9999
      }
    : {};

  return (
    <div
      ref={listRef}
      className="expression-suggestion-list"
      style={{
        ...style,
        background: '#fff',
        color: '#1a1a1a',
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        maxHeight: 280,
        overflowY: 'auto',
        minWidth: 200,
        padding: 4
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.id || item.label}
          role="option"
          aria-selected={index === selectedIndex}
          onClick={() => {
            command(item);
            onClose?.();
          }}
          onMouseEnter={() => setSelectedIndex(index)}
          style={{
            padding: '8px 12px',
            fontSize: '0.8rem',
            cursor: 'pointer',
            borderRadius: 4,
            color: index === selectedIndex ? '#0d47a1' : '#1a1a1a',
            backgroundColor: index === selectedIndex ? 'rgba(25, 118, 210, 0.15)' : 'transparent'
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
