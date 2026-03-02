import { useState, useRef } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import { ChevronButton } from '../atoms';

const OPTIONS = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

const INITIAL_WIDTH = 360;

/**
 * Compact Yes/No dropdown trigger (⬇️).
 * Stores true/false.
 */
export default function BooleanPickerButton({ value, onSelect, containerRef }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuWidth, setMenuWidth] = useState(INITIAL_WIDTH);
  const buttonRef = useRef(null);

  const handleOpen = () => {
    const el = containerRef?.current ?? buttonRef.current ?? null;
    setAnchorEl(el);
    if (el) setMenuWidth(el.getBoundingClientRect().width ?? INITIAL_WIDTH);
  };
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (val) => {
    onSelect(val);
    handleClose();
  };

  return (
    <>
      <ChevronButton ref={buttonRef} onClick={handleOpen} active={Boolean(anchorEl)} aria-label="Open Yes/No picker" />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          className: 'boolean-picker-button__paper',
          sx: { width: menuWidth, minWidth: menuWidth, maxWidth: menuWidth }
        }}
        MenuListProps={{ disablePadding: true, className: 'boolean-picker-button__menu-list' }}
      >
        {OPTIONS.map((opt) => (
          <MenuItem
            key={String(opt.value)}
            onClick={() => handleSelect(opt.value)}
            selected={opt.value === value}
            className="boolean-picker-button__menu-item"
          >
            <Box component="span" className="boolean-picker-button__menu-item-label">
              {opt.label}
            </Box>
            {opt.value === value && <CheckIcon />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
