import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ListSubheader from '@mui/material/ListSubheader';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import { FieldTypeIcon } from '../atoms';

const FieldIcon = ({ icon }) => {
  if (!icon) return null;
  return (
    <span className="input-select-field__field-icon">
      <FieldTypeIcon icon={icon} size={18} />
    </span>
  );
};

export default function InputSelectField({ data, value, onChange, options = [] }) {
  const isControlled = value !== undefined && onChange !== undefined;
  const [internalValue, setInternalValue] = React.useState(data?.value ?? (options[0]?.value ?? ''));
  const [anchorWidth, setAnchorWidth] = React.useState(null);
  const [filter, setFilter] = React.useState('');
  const anchorRef = React.useRef(null);
  const currentValue = isControlled ? value : internalValue;

  const filteredOptions = React.useMemo(() => {
    if (!filter.trim()) return options;
    const q = filter.trim().toLowerCase();
    return options.filter((o) => (o.label ?? o.value ?? '').toLowerCase().includes(q));
  }, [options, filter]);

  const handleChange = (e) => {
    const next = e.target.value;
    if (isControlled) onChange(next);
    else setInternalValue(next);
  };

  const handleOpen = () => {
    if (anchorRef.current) {
      setAnchorWidth(anchorRef.current.getBoundingClientRect().width);
    }
    setFilter('');
  };

  return (
    <div className="input-select-field">
      <label className="input-select-field__label">Field</label>
      <FormControl ref={anchorRef} size="small" className="field-select-form-control">
        <Select
          onOpen={handleOpen}
          fullWidth
          value={currentValue}
          displayEmpty
          variant="outlined"
          IconComponent={KeyboardArrowDownIcon}
          onChange={handleChange}
          renderValue={(selected) => {
            const opt = options.find((o) => o.value === selected);
            if (!opt) return selected;
            return (
              <span className="input-select-field__value">
                <FieldIcon icon={opt.icon || opt.type} />
                {opt.label}
              </span>
            );
          }}
          sx={{ borderRadius: '6px' }}
          MenuProps={{
            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
            transformOrigin: { vertical: 'top', horizontal: 'left' },
            PaperProps: {
              className: 'input-select-field__menu',
              sx: {
                width: anchorWidth ?? 360,
                minWidth: anchorWidth ?? 360,
                maxWidth: anchorWidth ?? 360,
                maxHeight: 320,
                borderRadius: '12px'
              }
            },
            MenuListProps: {
              disablePadding: true,
              sx: { maxHeight: 280, overflow: 'auto' }
            }
          }}
        >
          <ListSubheader component="div" className="input-select-field__section-label">
            Field name types
          </ListSubheader>
          <ListSubheader component="div" className="input-select-field__filter-header">
            <TextField
              size="small"
              placeholder="Filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
              }}
              onKeyDownCapture={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="input-select-field__filter"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.5)' }} />
                  </InputAdornment>
                )
              }}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: 40,
                  minHeight: 40
                }
              }}
            />
          </ListSubheader>
          {filteredOptions.map((opt) => {
            const isSelected = opt.value === currentValue;
            return (
              <MenuItem
                key={opt.value}
                value={opt.value}
                selected={isSelected}
                className="input-select-field__menu-item"
                sx={{
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  margin: '0 4px 2px',
                  '&:hover': { backgroundColor: '#d7c0ff' },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(147, 112, 219, 0.2)',
                    '&:hover': { backgroundColor: '#d7c0ff' }
                  }
                }}
              >
                <FieldIcon icon={opt.icon || opt.type} />
                <span className="input-select-field__menu-item-label">{opt.label}</span>
                {isSelected && <CheckIcon sx={{ fontSize: 22, color: '#1a1a1a' }} />}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
