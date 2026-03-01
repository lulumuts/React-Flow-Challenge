import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * Chevron button used as picker trigger in the value field.
 * Shows light purple background when active (dropdown open).
 */
export default function ChevronButton({ onClick, active = false, 'aria-label': ariaLabel = 'Open picker' }) {
  return (
    <IconButton
      size="small"
      onClick={onClick}
      aria-label={ariaLabel}
      disableFocusRipple
      sx={{
        p: 0.25,
        ...(active && { backgroundColor: 'rgba(147, 112, 219, 0.2)' }),
        '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
        '&:focus': { outline: 'none' }
      }}
    >
      <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
    </IconButton>
  );
}
