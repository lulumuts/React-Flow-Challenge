import * as React from 'react';
import { Handle, Position } from '@xyflow/react';
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
    <span style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(0, 0, 0, 0.6)', flexShrink: 0 }}>
      <FieldTypeIcon icon={icon} size={14} />
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
    <div style={{ width: 248, padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
      <Handle type="target" position={Position.Top} />

      <label style={{ fontSize: '0.8rem', minWidth: 40, flexShrink: 0, opacity: 0.7 }}>Field</label>
      <FormControl ref={anchorRef} size="small" sx={{ flex: 1, minWidth: 0 }}>
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
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <FieldIcon icon={opt.icon || opt.type} />
                {opt.label}
              </span>
            );
          }}
          sx={{
            flex: 1,
            borderRadius: '6px',
            '& .MuiSelect-select': { fontSize: '0.8rem', display: 'flex', alignItems: 'center' },
            '& fieldset': { borderRadius: '12px' },
            '& .MuiOutlinedInput-root': { height: 40 },
            '& .MuiSelect-icon': { fontSize: 20 }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                width: anchorWidth ?? 188,
                minWidth: anchorWidth ?? 188,
                maxWidth: anchorWidth ?? 188,
                borderRadius: 6,
                maxHeight: 280
              }
            },
            MenuListProps: { dense: true, disablePadding: true }
          }}
        >
          <ListSubheader
            component="div"
            sx={{
              position: 'sticky',
              top: 0,
              backgroundColor: 'background.paper',
              zIndex: 1,
              py: 0,
              px: 1,
              pt: 1.5,
              pb: 0.5,
              lineHeight: 0
            }}
          >
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: 'rgba(0, 0, 0, 0.5)' }} />
                  </InputAdornment>
                )
              }}
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': { fontSize: '0.8rem', borderRadius: 2 }
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
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.85rem',
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.5,
                  '&:hover': { backgroundColor: '#d7c0ff' },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(147, 112, 219, 0.2)',
                    '&:hover': { backgroundColor: '#d7c0ff' }
                  }
                }}
              >
                <FieldIcon icon={opt.icon || opt.type} />
                <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opt.label}</span>
                {isSelected && <CheckIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
