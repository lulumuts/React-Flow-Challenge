import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import { ChevronButton } from '../atoms';
import { useEnumPicker } from '../../hooks/useEnumPicker';

/**
 * Compact options dropdown trigger (⬇️).
 * options: [{ value, label }]
 * Shows first 20, loads more on scroll.
 */
export default function EnumPickerButton({ options = [], optionsLoader, onOptionsLoaded, value, onSelect, containerRef }) {
  const {
    anchorEl,
    menuWidth,
    filter,
    setFilter,
    optionsLoading,
    visibleOptions,
    filteredOptions,
    hasMore,
    buttonRef,
    open,
    close,
    handleScroll
  } = useEnumPicker({ options, optionsLoader, onOptionsLoaded, containerRef });

  const handleSelect = (opt) => {
    onSelect(opt.value);
    close();
  };

  const isEmpty = filteredOptions.length === 0 && !optionsLoading;
  const placeholder = options.length > 20 ? 'Search languages...' : 'Filter...';

  return (
    <>
      <ChevronButton ref={buttonRef} onClick={open} active={Boolean(anchorEl)} aria-label="Open options picker" />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          className: 'enum-picker-button__paper',
          sx: { width: menuWidth, minWidth: menuWidth, maxWidth: menuWidth }
        }}
        MenuListProps={{
          dense: true,
          disablePadding: true,
          onScroll: handleScroll,
          className: 'enum-picker-button__menu-list'
        }}
      >
        <Box className="enum-picker-button__filter-wrapper">
          <TextField
            size="small"
            placeholder={placeholder}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="enum-picker-button__filter"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18 }} />
                </InputAdornment>
              )
            }}
            sx={{ width: '100%' }}
          />
        </Box>
        {optionsLoading && (
          <MenuItem disabled className="enum-picker-button__menu-item--loading">
            Loading languages…
          </MenuItem>
        )}
        {!optionsLoading && isEmpty && (
          <MenuItem disabled className="enum-picker-button__menu-item--empty">
            No options
          </MenuItem>
        )}
        {!optionsLoading && !isEmpty &&
          visibleOptions.map((opt) => (
            <MenuItem
              key={String(opt.value)}
              onClick={() => handleSelect(opt)}
              selected={opt.value === value}
              className="enum-picker-button__menu-item"
            >
              <Box component="span" className="enum-picker-button__menu-item-label">
                {opt.label ?? opt.value}
              </Box>
              {opt.value === value && <CheckIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />}
            </MenuItem>
          ))}
        {hasMore && (
          <MenuItem disabled className="enum-picker-button__menu-item--more">
            Scroll for more ({visibleOptions.length} of {filteredOptions.length.toLocaleString()})
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
