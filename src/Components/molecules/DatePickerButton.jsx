import { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import { ChevronButton } from '../atoms';

/**
 * Compact date picker trigger (⬇️). Opens date input on click.
 * Stores ISO string, displays human-friendly format via parent.
 */
export default function DatePickerButton({ onSelect, containerRef }) {
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

  const handleChange = (e) => {
    const v = e.target.value;
    if (!v) return;
    const iso = new Date(v + 'T00:00:00.000Z').toISOString();
    onSelect(iso);
    handleClose();
  };

  return (
    <>
      <ChevronButton onClick={handleOpen} active={Boolean(anchorEl)} aria-label="Open date picker" />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: { width: menuWidth, minWidth: menuWidth, maxWidth: 'none', borderRadius: 4 }
        }}
      >
        <TextField
          type="date"
          onChange={handleChange}
          InputProps={{ sx: { fontSize: '0.8rem' } }}
          sx={{ p: 1 }}
        />
      </Popover>
    </>
  );
}
