import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * Compact options dropdown trigger (⬇️).
 * options: [{ value, label }]
 * Stores option.value.
 */
export default function EnumPickerButton({ options = [], onSelect, containerRef }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuWidth, setMenuWidth] = useState(160);

  const handleOpen = () => setAnchorEl(containerRef?.current ?? null);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    if (anchorEl) {
      const w = anchorEl.getBoundingClientRect().width;
      setMenuWidth(w > 0 ? w : 160);
    }
  }, [anchorEl]);

  const handleSelect = (opt) => {
    onSelect(opt.value);
    handleClose();
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
        aria-label="Open options picker"
        disableFocusRipple
        sx={{
          p: 0.25,
          ...(anchorEl && { backgroundColor: 'rgba(147, 112, 219, 0.2)' }),
          '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
          '&:focus': { outline: 'none' }
        }}
      >
        <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { width: menuWidth, minWidth: menuWidth, maxWidth: 'none', maxHeight: 280, borderRadius: 4 } }}
        MenuListProps={{ dense: true }}
      >
        {options.map((opt) => (
          <MenuItem
            key={String(opt.value)}
            onClick={() => handleSelect(opt)}
            sx={{ fontSize: '0.8rem' }}
          >
            {opt.label ?? opt.value}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
