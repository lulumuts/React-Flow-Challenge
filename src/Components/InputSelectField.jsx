import * as React from 'react';
import { Handle, Position } from '@xyflow/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function InputSelectField({ data }) {
  const [age, setAge] = React.useState(data?.value || '');

  return (
    <div style={{ width: 232, padding: 8 }}>
      <Handle type="target" position={Position.Top} />

      <FormControl fullWidth size="small">
        <InputLabel sx={{ fontSize: '0.5rem' }}>Age</InputLabel>
        <Select
          value={age}
          label="Age"
          onChange={(e) => setAge(e.target.value)}
          MenuProps={{
            PaperProps: {
            sx: {
              width: 300,
              left: 32
            },
          },
        }}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
