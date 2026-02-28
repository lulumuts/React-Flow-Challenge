import { useCallback } from "react";
import { Position, Handle } from "@xyflow/react";

export default function InputTextField () {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value)
    },[]);

    return (
        <div className="text-updater-node">
            <div>
                <label htmlFor="text">Text:</label>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={onChange}  />
                <Handle type="source" position={Position.Bottom} id="a" />
            </div>
        </div>
    )
}
