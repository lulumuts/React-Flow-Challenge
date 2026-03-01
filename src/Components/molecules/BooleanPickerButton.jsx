import { useState, useEffect } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import { ChevronButton } from '../atoms';

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
  const [menuWidth, setMenuWidth] = useState(360);

  const handleOpen = () => setAnchorEl(containerRef?.current ?? null);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (anchorEl && containerRef?.current) {
      const w = containerRef.current.getBoundingClientRect().width;
      setMenuWidth(w);
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
            minWidth: menuWidth,
            maxWidth: menuWidth,
            maxHeight: 280,
            borderRadius: 4
          }
        }}
        MenuListProps={{ disablePadding: true, sx: { pt: 1.5, pb: 0.5 } }}
      >
        {OPTIONS.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <MenuItem
              key={String(opt.value)}
              onClick={() => handleSelect(opt.value)}
              selected={isSelected}
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.95rem',
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                py: 1.75,
                '&:hover': { backgroundColor: '#d7c0ff' },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(147, 112, 219, 0.2)',
                  '&:hover': { backgroundColor: '#d7c0ff' }
                }
              }}
            >
              <Box component="span" sx={{ flex: 1 }}>{opt.label}</Box>
              {isSelected && <CheckIcon sx={{ fontSize: 22, color: '#1a1a1a' }} />}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
