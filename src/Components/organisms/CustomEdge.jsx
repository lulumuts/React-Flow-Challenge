import { BaseEdge, getSmoothStepPath, Position } from '@xyflow/react';

export function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style }) {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition: sourcePosition ?? Position.Left,
        targetPosition: targetPosition ?? Position.Left,
        stepPosition: 0,
        offset: 48,
        borderRadius: 8
    });

    const strokeStyle = { stroke: '#8350cb', strokeWidth: 3, ...style };

    return (
        <BaseEdge
            id={id}
            path={edgePath}
            style={strokeStyle}
        />
    );
}

