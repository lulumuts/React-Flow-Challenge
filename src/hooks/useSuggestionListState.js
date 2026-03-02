import { useEffect, useMemo, useRef, useState } from 'react';
import { filterSuggestionsByQuery } from '../lib/expressionSuggestions';

/**
 * Manages filter state, filtered items, selected index, and scroll-into-view
 * for the expression suggestion list.
 */
export function useSuggestionListState({
  items = [],
  selectedIndex,
  setSelectedIndex,
  filteredItemsRef
}) {
  const listRef = useRef(null);
  const filterInputRef = useRef(null);
  const [filter, setFilter] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filteredItems = useMemo(
    () => filterSuggestionsByQuery(items, filter),
    [items, filter]
  );

  // Sync filtered items to parent (used by TipTap keyboard handler)
  useEffect(() => {
    if (filteredItemsRef) filteredItemsRef.current = filteredItems;
  }, [filteredItems, filteredItemsRef]);

  // Reset filter and selection when items change
  useEffect(() => {
    setFilter('');
    setSelectedIndex(0);
  }, [items, setSelectedIndex]);

  // Reset selection when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filter, setSelectedIndex]);

  // Clamp selected index when filtered list shrinks
  useEffect(() => {
    if (selectedIndex >= filteredItems.length && filteredItems.length > 0) {
      setSelectedIndex(filteredItems.length - 1);
    }
  }, [filteredItems.length, selectedIndex, setSelectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current;
    if (el && selectedIndex >= 0 && filteredItems[selectedIndex]) {
      const itemEl = el.querySelector(`[data-index="${selectedIndex}"]`);
      itemEl?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex, filteredItems]);

  return {
    filter,
    setFilter,
    filteredItems,
    hoveredIndex,
    setHoveredIndex,
    listRef,
    filterInputRef
  };
}
