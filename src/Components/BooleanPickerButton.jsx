import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const OPTIONS = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
];

/**
 * Compact Yes/No dropdown trigger (⬇️).
 * Stores true/false.
 */
export default function BooleanPickerButton({ onSelect, containerRef }) {
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

  const handleSelect = (val) => {
    onSelect(val);
    handleClose();
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
        aria-label="Open Yes/No picker"
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
        PaperProps={{
          sx: { width: menuWidth, minWidth: menuWidth, maxWidth: 'none', borderRadius: 4 }
        }}
        MenuListProps={{ dense: true }}
      >
        {OPTIONS.map((opt) => (
          <MenuItem key={String(opt.value)} onClick={() => handleSelect(opt.value)} sx={{ fontSize: '0.8rem' }}>
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
