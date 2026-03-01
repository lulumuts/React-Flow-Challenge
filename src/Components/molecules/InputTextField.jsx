import { useCallback } from "react";
import TextField from "@mui/material/TextField";

export default function InputTextField({ label = 'Value' }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div style={{ width: 232, padding: 8, display: 'flex', alignItems: 'center', gap: 8 }} className="nodrag">
            <label style={{ fontSize: '0.8rem', minWidth: 48, flexShrink: 0, opacity: 0.7 }}>{label}</label>
            <TextField
                id="value-input"
                variant="outlined"
                size="small"
                fullWidth
                onChange={onChange}
                InputProps={{ sx: { '& input': { fontSize: '0.8rem' } } }}
                sx={{
                flex: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  height: 40
                },
                '& .MuiOutlinedInput-input': { py: 1 }
              }}
            />
        </div>
    );
}
