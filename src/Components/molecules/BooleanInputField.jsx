import * as React from 'react';
import { Handle, Position } from '@xyflow/react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function BooleanInputField({ data, label = 'Boolean', defaultValue = false, embedded = false }) {
  const [value, setValue] = React.useState(data?.value ?? defaultValue);

  return (
    <div style={{ width: 232, padding: 8, display: 'flex', alignItems: 'center', gap: 8 }} className="nodrag">
      {!embedded && <Handle type="target" position={Position.Top} />}

      <FormControlLabel
        control={
          <Switch
            checked={!!value}
            onChange={(e) => setValue(e.target.checked)}
            size="small"
          />
        }
        label={label}
        labelPlacement="start"
        sx={{
          flex: 1,
          margin: 0,
          '& .MuiFormControlLabel-label': { fontSize: '0.8rem', opacity: 0.7 }
        }}
      />

      {!embedded && <Handle type="source" position={Position.Bottom} id="a" />}
    </div>
  );
}
