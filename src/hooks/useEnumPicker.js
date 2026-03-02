import { useState, useEffect, useMemo, useRef } from 'react';

const INITIAL_WIDTH = 188;

function filterOptions(options, query) {
  const q = (query || '').trim().toLowerCase();
  return !q ? options : options.filter((o) => (o.label ?? o.value ?? '').toLowerCase().includes(q));
}
const INITIAL_VISIBLE = 20;
const LOAD_MORE_STEP = 20;

/**
 * Hook for enum picker dropdown: menu open/close, filter, virtual scroll, options loading.
 */
export function useEnumPicker({ options = [], optionsLoader, onOptionsLoaded, containerRef }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuWidth, setMenuWidth] = useState(INITIAL_WIDTH);
  const [filter, setFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const buttonRef = useRef(null);

  const loadOptions = () => {
    if (!optionsLoader || options.length > 0) return;
    setOptionsLoading(true);
    optionsLoader()
      .then((opts) => onOptionsLoaded?.(opts ?? []))
      .catch(() => onOptionsLoaded?.([]))
      .finally(() => setOptionsLoading(false));
  };

  const open = () => {
    setAnchorEl(containerRef?.current ?? buttonRef.current ?? null);
    setFilter('');
    setVisibleCount(INITIAL_VISIBLE);
    loadOptions();
  };

  const close = () => setAnchorEl(null);

  useEffect(() => {
    if (anchorEl) {
      const w = containerRef?.current?.getBoundingClientRect().width ?? INITIAL_WIDTH;
      setMenuWidth(w);
    }
  }, [anchorEl, containerRef]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [filter]);

  const filteredOptions = useMemo(
    () => filterOptions(options, filter),
    [options, filter]
  );

  const visibleOptions = useMemo(
    () => filteredOptions.slice(0, visibleCount),
    [filteredOptions, visibleCount]
  );

  const hasMore = visibleCount < filteredOptions.length;

  const handleScroll = (e) => {
    const el = e.target;
    if (!hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      setVisibleCount((c) => Math.min(c + LOAD_MORE_STEP, filteredOptions.length));
    }
  };

  return {
    anchorEl,
    menuWidth,
    filter,
    setFilter,
    optionsLoading,
    filteredOptions,
    visibleOptions,
    hasMore,
    buttonRef,
    open,
    close,
    handleScroll
  };
}
