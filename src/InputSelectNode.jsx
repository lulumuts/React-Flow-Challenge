import * as React from 'react';
import { Handle, Position } from '@xyflow/react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function InputSelectNode({ data }) {
  const [age, setAge] = React.useState(data?.value || '');

  return (
    <div style={{ width: 180, padding: 8 }}>
      <Handle type="target" position={Position.Top} />

      <div className="drag-handle" style={{ cursor: 'grab', fontSize: 12 }}>
        Drag
      </div>

      <FormControl fullWidth size="small">
        <InputLabel>Age</InputLabel>
        <Select
          value={age}
          label="Age"
          onChange={(e) => setAge(e.target.value)}
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
