import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Small clear (X) button used in the value field to reset picker values.
 */
export default function ClearButton({ onClick, 'aria-label': ariaLabel = 'Clear value' }) {
  return (
    <IconButton
      size="small"
      onClick={onClick}
      aria-label={ariaLabel}
      disableFocusRipple
      sx={{
        p: 0.15,
        minWidth: 24,
        minHeight: 24,
        '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
        '&:focus': { outline: 'none' }
      }}
    >
      <CloseIcon sx={{ fontSize: 14 }} />
    </IconButton>
  );
}
