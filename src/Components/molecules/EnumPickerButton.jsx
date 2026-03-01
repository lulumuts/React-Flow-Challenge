import { useState, useEffect, useMemo } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import { ChevronButton } from '../atoms';

const DROPDOWN_MAX_WIDTH = 220;

/**
 * Compact options dropdown trigger (⬇️).
 * options: [{ value, label }]
 * value: currently selected value (for highlighting)
 * Stores option.value.
 */
export default function EnumPickerButton({ options = [], value, onSelect, containerRef }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuWidth, setMenuWidth] = useState(160);
  const [filter, setFilter] = useState('');

  const handleOpen = () => {
    setAnchorEl(containerRef?.current ?? null);
    setFilter('');
  };
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (anchorEl) {
      const w = containerRef?.current?.getBoundingClientRect().width ?? 160;
      setMenuWidth(Math.min(w, DROPDOWN_MAX_WIDTH));
    }
  }, [anchorEl, containerRef]);

  const filteredOptions = useMemo(() => {
    if (!filter.trim()) return options;
    const q = filter.trim().toLowerCase();
    return options.filter((o) => (o.label ?? o.value).toLowerCase().includes(q));
  }, [options, filter]);

  const handleSelect = (opt) => {
    onSelect(opt.value);
    handleClose();
  };

  return (
    <>
      <ChevronButton onClick={handleOpen} active={Boolean(anchorEl)} aria-label="Open options picker" />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            width: menuWidth,
            minWidth: 200,
            maxWidth: DROPDOWN_MAX_WIDTH,
            maxHeight: 280,
            borderRadius: 4
          }
        }}
        MenuListProps={{ dense: true, disablePadding: true }}
      >
        <Box sx={{ px: 1, pt: 1.5, pb: 0.5 }}>
          <TextField
            size="small"
            placeholder="Filter..."
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
              '& .MuiOutlinedInput-root': { fontSize: '0.8rem', borderRadius: 2 }
            }}
          />
        </Box>
        {filteredOptions.map((opt) => {
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
        })}
      </Menu>
    </>
  );
}
