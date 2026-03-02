import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useSuggestionListState } from '../../hooks/useSuggestionListState';
import SuggestionItem from '../molecules/SuggestionItem';

/** Floating suggestion list for Turn.io expressions (organism – composed of molecules). */
export default function ExpressionSuggestionList({
  suggestionProps,
  selectedIndex,
  setSelectedIndex,
  filteredItemsRef,
  onClose
}) {
  const { items = [], command, clientRect } = suggestionProps || {};

  const {
    filter,
    setFilter,
    filteredItems,
    hoveredIndex,
    setHoveredIndex,
    listRef,
    filterInputRef
  } = useSuggestionListState({
    items,
    selectedIndex,
    setSelectedIndex,
    filteredItemsRef
  });

  if (!suggestionProps || items.length === 0) return null;

  const handleSelect = (item) => {
    command(item);
    onClose?.();
  };

  const handleFilterKeyDown = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'Enter') return;

    e.preventDefault();
    if (e.key === 'ArrowDown' && filteredItems.length > 0) {
      setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1));
    } else if (e.key === 'ArrowUp' && filteredItems.length > 0) {
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  const placeholder = items.some((i) => i.category === 'contact')
    ? 'Search contact properties...'
    : 'Search expressions...';

  return (
    <div
      className="expression-suggestion-list"
      style={getListPositionStyle(clientRect)}
    >
      <div className="expression-suggestion-list__filter">
        <TextField
          inputRef={filterInputRef}
          size="small"
          placeholder={placeholder}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={handleFilterKeyDown}
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
      <div ref={listRef} className="expression-suggestion-list__list">
        {filteredItems.length === 0 ? (
          <div className="expression-suggestion-list__empty">No matches</div>
        ) : (
          filteredItems.map((item, index) => (
            <SuggestionItem
              key={item.id || item.label}
              item={item}
              index={index}
              isSelected={index === selectedIndex}
              onSelect={() => handleSelect(item)}
              onHover={() => {
                setSelectedIndex(index);
                setHoveredIndex(index);
              }}
              onHoverEnd={() => setHoveredIndex(null)}
            />
          ))
        )}
      </div>
    </div>
  );
}

function getListPositionStyle(clientRect) {
  const rect = typeof clientRect === 'function' ? clientRect() : null;
  if (!rect) return {};
  return {
    position: 'fixed',
    top: rect.bottom + 24,
    left: rect.left - 24,
    zIndex: 9999
  };
}
