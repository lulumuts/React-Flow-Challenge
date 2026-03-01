import { useState } from 'react';
import Popover from '@mui/material/Popover';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import { ChevronButton } from '../atoms';

/**
 * Compact date picker trigger. Opens calendar on click.
 * Stores ISO string, displays human-friendly format via parent.
 */
export default function DatePickerButton({ onSelect, containerRef }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(dayjs());

  const handleOpen = () => setAnchorEl(containerRef?.current ?? null);
  const handleClose = () => setAnchorEl(null);

  // StaticDatePicker needs ~320px to display calendar properly
  const menuWidth = 320;

  const handleChange = (date) => {
    setValue(date ?? dayjs());
    if (date) {
      const iso = `${date.format('YYYY-MM-DD')}T00:00:00.000Z`;
      onSelect(iso);
      handleClose();
    }
  };

  return (
    <>
      <ChevronButton icon="calendar" onClick={handleOpen} active={Boolean(anchorEl)} aria-label="Open date picker" />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: { width: menuWidth, minWidth: menuWidth, borderRadius: 4 }
        }}
      >
        <StaticDatePicker
          value={value}
          onChange={handleChange}
          slotProps={{
            actionBar: { actions: ['today'] }
          }}
          sx={{
            border: 'none',
            width: '100%',
            '& .MuiPickersCalendarHeader-root': { paddingLeft: 2, paddingRight: 2 },
            '& .MuiDayCalendar-root': { width: '100%' },
            '& .MuiPickersMonth-root': { width: '100%' }
          }}
        />
      </Popover>
    </>
  );
}
