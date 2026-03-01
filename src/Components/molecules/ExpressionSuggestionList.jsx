import { useEffect, useRef, useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import { FieldTypeIcon } from '../atoms';

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
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const filterInputRef = useRef(null);

  const { items = [], command, clientRect } = suggestionProps || {};

  const filteredItems = useMemo(() => {
    if (!filter.trim()) return items;
    const q = filter.trim().toLowerCase();
    return items.filter(
      (item) =>
        (item.label || '').toLowerCase().includes(q) ||
        (item.id || '').toLowerCase().includes(q) ||
        (item.displayLabel || '').toLowerCase().includes(q)
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
        top: rect.bottom + 24,
        left: rect.left - 24,
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
        borderRadius: 12,
        boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
        maxHeight: 280,
        minWidth: 360,
        width: 360,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <div style={{ flexShrink: 0, padding: '12px 8px 4px', lineHeight: 0 }}>
        <TextField
          inputRef={filterInputRef}
          size="small"
          placeholder={items.some((i) => i.category === 'contact') ? 'Search contact properties...' : 'Search expressions...'}
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
            '& .MuiOutlinedInput-root': { fontSize: '0.75rem', borderRadius: 2, height: 48 }
          }}
        />
      </div>
      <div
        ref={listRef}
        style={{
          overflowY: 'auto',
          flex: 1,
          padding: '0 4px 4px'
        }}
      >
        {filteredItems.length === 0 ? (
          <div style={{ padding: '12px', fontSize: '0.75rem', color: 'rgba(0,0,0,0.5)' }}>
            No matches
          </div>
        ) : (
          filteredItems.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isSelected = index === selectedIndex;
            const backgroundColor = isHovered ? '#d7c0ff' : isSelected ? 'rgba(147, 112, 219, 0.2)' : 'transparent';
            return (
            <div
              key={item.id || item.label}
              data-index={index}
              role="option"
              aria-selected={isSelected}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => {
                setSelectedIndex(index);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 12px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                borderRadius: 8,
                margin: '0 8px 4px 8px',
                color: '#1a1a1a',
                backgroundColor
              }}
            >
              {item.type && (
                <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', color: 'rgba(0, 0, 0, 0.6)' }}>
                  <FieldTypeIcon icon={item.type} size={18} />
                </span>
              )}
              <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
              <span style={{ width: 22, height: 22, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckIcon sx={{ fontSize: 22, color: '#1a1a1a', opacity: isSelected ? 1 : 0 }} />
              </span>
            </div>
            );
          })
        )}
      </div>
    </div>
  );
}
