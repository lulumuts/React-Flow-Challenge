import { useEffect, useRef, useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Floating suggestion list for Turn.io expressions.
 * Renders when suggestionProps is set, handles click and keyboard nav.
 */
export default function ExpressionSuggestionList({
  suggestionProps,
  selectedIndex,
  setSelectedIndex,
  filteredItemsRef,
  onClose
}) {
  const listRef = useRef(null);
  const [filter, setFilter] = useState('');
  const filterInputRef = useRef(null);

  const { items = [], command, clientRect } = suggestionProps || {};

  const filteredItems = useMemo(() => {
    if (!filter.trim()) return items;
    const q = filter.trim().toLowerCase();
    return items.filter(
      (item) =>
        (item.label || '').toLowerCase().includes(q) ||
        (item.id || '').toLowerCase().includes(q)
    );
  }, [items, filter]);

  useEffect(() => {
    if (filteredItemsRef) {
      filteredItemsRef.current = filteredItems;
    }
  }, [filteredItems, filteredItemsRef]);

  useEffect(() => {
    setFilter('');
    setSelectedIndex(0);
  }, [items, setSelectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [filter, setSelectedIndex]);

  useEffect(() => {
    if (selectedIndex >= filteredItems.length && filteredItems.length > 0) {
      setSelectedIndex(filteredItems.length - 1);
    }
  }, [filteredItems.length, selectedIndex, setSelectedIndex]);

  useEffect(() => {
    const el = listRef.current;
    if (el && selectedIndex >= 0 && filteredItems[selectedIndex]) {
      const itemEl = el.querySelector(`[data-index="${selectedIndex}"]`);
      itemEl?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex, filteredItems]);

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

  const handleSelect = (item) => {
    command(item);
    onClose?.();
  };

  return (
    <div
      className="expression-suggestion-list"
      style={{
        ...style,
        background: '#fff',
        color: '#1a1a1a',
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        maxHeight: 280,
        minWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <div style={{ flexShrink: 0, padding: 8, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        <TextField
          inputRef={filterInputRef}
          size="small"
          placeholder="Filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
              e.preventDefault();
              if (e.key === 'ArrowDown' && filteredItems.length > 0) {
                setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1));
              } else if (e.key === 'ArrowUp' && filteredItems.length > 0) {
                setSelectedIndex((i) => Math.max(i - 1, 0));
              } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
                handleSelect(filteredItems[selectedIndex]);
              }
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.5)' }} />
              </InputAdornment>
            )
          }}
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': { fontSize: '0.8rem', borderRadius: 2 }
          }}
        />
      </div>
      <div
        ref={listRef}
        style={{
          overflowY: 'auto',
          flex: 1,
          padding: 4
        }}
      >
        {filteredItems.length === 0 ? (
          <div style={{ padding: '12px', fontSize: '0.8rem', color: 'rgba(0,0,0,0.5)' }}>
            No matches
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={item.id || item.label}
              data-index={index}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => handleSelect(item)}
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
          ))
        )}
      </div>
    </div>
  );
}
