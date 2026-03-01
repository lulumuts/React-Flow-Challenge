import * as React from 'react';
import { Handle, Position } from '@xyflow/react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PlaceIcon from '@mui/icons-material/Place';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TranslateIcon from '@mui/icons-material/Translate';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';

const FIELD_ICONS = {
  text: TextFieldsIcon,
  location: PlaceIcon,
  boolean: VisibilityIcon,
  language: TranslateIcon,
  date: CalendarTodayIcon,
  enum: CategoryIcon
};

const FieldIcon = ({ icon }) => {
  if (!icon) return null;
  const IconComponent = FIELD_ICONS[icon] || FIELD_ICONS.text;
  return IconComponent ? <IconComponent sx={{ fontSize: 20, mr: 1.5, color: 'action.active' }} /> : null;
};

export default function InputSelectField({ data, value, onChange, options = [] }) {
  const isControlled = value !== undefined && onChange !== undefined;
  const [internalValue, setInternalValue] = React.useState(data?.value ?? (options[0]?.value ?? ''));
  const currentValue = isControlled ? value : internalValue;
  const handleChange = (e) => {
    const next = e.target.value;
    if (isControlled) onChange(next);
    else setInternalValue(next);
  };

  return (
    <div style={{ width: 248, padding: '8px 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
      <Handle type="target" position={Position.Top} />

      <label style={{ fontSize: '0.8rem', minWidth: 40, flexShrink: 0 }}>Field</label>
      <FormControl size="small" sx={{ flex: 1, minWidth: 0 }}>
        <Select
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
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <FieldIcon icon={opt.icon || opt.type} />
                {opt.label}
              </span>
            );
          }}
          sx={{
            flex: 1,
            borderRadius: '6px',
            '& .MuiSelect-select': { fontSize: '0.8rem' },
            '& fieldset': { borderRadius: '12px' },
            '& .MuiOutlinedInput-root': { height: 40 },
            '& .MuiSelect-icon': { fontSize: 20 }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                width: 300,
                left: 32,
                borderRadius: 6
              }
            }
          }}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value} sx={{ display: 'flex', alignItems: 'center' }}>
              <FieldIcon icon={opt.icon || opt.type} />
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
