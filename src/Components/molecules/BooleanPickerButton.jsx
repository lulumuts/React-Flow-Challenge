import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import { ChevronButton } from '../atoms';

const DROPDOWN_MAX_WIDTH = 220;
const OPTIONS = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

/**
 * Compact Yes/No dropdown trigger (⬇️).
 * Stores true/false.
 */
export default function BooleanPickerButton({ value, onSelect, containerRef }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuWidth, setMenuWidth] = useState(160);

  const handleOpen = () => setAnchorEl(containerRef?.current ?? null);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (anchorEl) {
      const w = containerRef?.current?.getBoundingClientRect().width ?? 160;
      setMenuWidth(Math.min(w, DROPDOWN_MAX_WIDTH));
    }
  }, [anchorEl, containerRef]);

  const handleSelect = (val) => {
    onSelect(val);
    handleClose();
  };

  return (
    <>
      <ChevronButton onClick={handleOpen} active={Boolean(anchorEl)} aria-label="Open Yes/No picker" />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            width: menuWidth,
            minWidth: 140,
            maxWidth: DROPDOWN_MAX_WIDTH,
            maxHeight: 280,
            borderRadius: 4
          }
        }}
        MenuListProps={{ dense: true, disablePadding: true, sx: { pt: 1.5, pb: 0.5 } }}
      >
        {OPTIONS.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <MenuItem
              key={String(opt.value)}
              onClick={() => handleSelect(opt.value)}
              selected={isSelected}
              sx={{
                fontSize: '0.8rem',
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                '&:hover': { backgroundColor: '#d7c0ff' },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(147, 112, 219, 0.2)',
                  '&:hover': { backgroundColor: '#d7c0ff' }
                }
              }}
            >
              <Box component="span" sx={{ flex: 1 }}>{opt.label}</Box>
              {isSelected && <CheckIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
