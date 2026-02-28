import { useCallback } from "react";
import { Position, Handle } from "@xyflow/react";

export function TextUpdaterNode(props) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value)
    },[]);

    return (
        <div className="text-updater-node">
            <div>
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag"/>
                <Handle type="source" position={Position.Bottom} id="a" />
            </div>
        </div>
    )
}