import { useState, useEffect, useMemo, useRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import { ChevronButton } from '../atoms';

const INITIAL_WIDTH = 188;
const INITIAL_VISIBLE = 20;
const LOAD_MORE_STEP = 20;

/**
 * Compact options dropdown trigger (⬇️).
 * options: [{ value, label }]
 * Shows first 20, loads more on scroll.
 */
export default function EnumPickerButton({ options = [], optionsLoader, onOptionsLoaded, value, onSelect, containerRef }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuWidth, setMenuWidth] = useState(INITIAL_WIDTH);
  const [filter, setFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const menuListRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOpen = () => {
    const needsLoad = optionsLoader && options.length === 0;
    if (needsLoad) setOptionsLoading(true);
    setAnchorEl(containerRef?.current ?? buttonRef.current ?? null);
    setFilter('');
    setVisibleCount(INITIAL_VISIBLE);
    if (needsLoad) {
      optionsLoader()
        .then((opts) => {
          onOptionsLoaded?.(opts ?? []);
        })
        .catch(() => {
          onOptionsLoaded?.([]);
        })
        .finally(() => {
          setOptionsLoading(false);
        });
    }
  };
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (anchorEl) {
      const w = containerRef?.current?.getBoundingClientRect().width ?? INITIAL_WIDTH;
      setMenuWidth(w);
    }
  }, [anchorEl, containerRef]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [filter]);

  const filteredOptions = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return !q ? options : options.filter((o) => (o.label ?? o.value).toLowerCase().includes(q));
  }, [options, filter]);

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

  const handleSelect = (opt) => {
    onSelect(opt.value);
    handleClose();
  };

  return (
    <>
      <ChevronButton ref={buttonRef} onClick={handleOpen} active={Boolean(anchorEl)} aria-label="Open options picker" />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          sx: {
            width: menuWidth,
            minWidth: menuWidth,
            maxWidth: menuWidth,
            maxHeight: 280,
            borderRadius: 4
          }
        }}
        MenuListProps={{
          dense: true,
          disablePadding: true,
          ref: menuListRef,
          onScroll: handleScroll,
          sx: { maxHeight: 240, overflow: 'auto' }
        }}
      >
        <Box sx={{ px: 1, pt: 1.5, pb: 0.5 }}>
          <TextField
            size="small"
            placeholder={options.length > 20 ? 'Search languages...' : 'Filter...'}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18 }} />
                </InputAdornment>
              )
            }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': { fontSize: '0.8rem', borderRadius: 2, height: 48 }
            }}
          />
        </Box>
        {optionsLoading ? (
          <MenuItem disabled sx={{ fontSize: '0.8rem', color: 'text.secondary', py: 2 }}>
            Loading languages…
          </MenuItem>
        ) : options.length === 0 && !optionsLoading ? (
          <MenuItem disabled sx={{ fontSize: '0.8rem', color: 'text.secondary', py: 2 }}>
            No options
          </MenuItem>
        ) : (
          visibleOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
            <MenuItem
              key={String(opt.value)}
              onClick={() => handleSelect(opt)}
              selected={isSelected}
              sx={{
                fontSize: '0.8rem',
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                '&:hover': { backgroundColor: '#d7c0ff' },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(147, 112, 219, 0.2)',
                  '&:hover': { backgroundColor: '#d7c0ff' },
                  '& .MuiListItemIcon-root': { color: 'inherit' }
                }
              }}
            >
              <Box component="span" sx={{ flex: 1 }}>{opt.label ?? opt.value}</Box>
              {isSelected && <CheckIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />}
            </MenuItem>
            );
          })
        )}
        {hasMore && (
          <MenuItem disabled sx={{ fontSize: '0.75rem', color: 'text.secondary', py: 1 }}>
            Scroll for more ({visibleOptions.length} of {filteredOptions.length.toLocaleString()})
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
