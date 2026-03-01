import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

/**
 * Picker trigger button in the value field.
 * Shows chevron by default, or calendar icon when icon="calendar" (e.g. for date/birthday).
 * Shows light purple background when active (dropdown open).
 */
export default function ChevronButton({
  onClick,
  active = false,
  icon = 'chevron',
  'aria-label': ariaLabel = 'Open picker'
}) {
  const Icon = icon === 'calendar' ? CalendarTodayIcon : KeyboardArrowDownIcon;
  return (
    <IconButton
      size="small"
      onClick={onClick}
      aria-label={ariaLabel}
      disableFocusRipple
      sx={{
        p: icon === 'calendar' ? 0.2 : 0.25,
        ...(icon === 'calendar' && { marginLeft: '4px' }),
        ...(active && { backgroundColor: 'rgba(147, 112, 219, 0.2)' }),
        '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
        '&:focus': { outline: 'none' }
      }}
    >
      <Icon
        sx={{
          fontSize: icon === 'calendar' ? 15 : 20,
          ...(icon === 'calendar' && { padding: 1 })
        }}
      />
    </IconButton>
  );
}
