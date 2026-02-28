import { useState, useCallback } from 'react';
import { 
  Background,
  Controls,
  MiniMap,
  ReactFlow, 
  applyNodeChanges, 
  applyEdgeChanges, 
  addEdge 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CustomEdge } from './Components/CustomEdge';
import  Card  from './Components/Card';


const edgeTypes = {
    'custom-edge': CustomEdge
}

const initialNodes = [
  { 
    id: 'n1',
    type: 'cardForm',
    position: { x: 0, y: 0 },
   data: { label: 'Node 1' } 
  },
  { id: 'n2',
    position: { x: 0, y: 200 },
    data: { label: 'Node 2' } 
  },
  { id: 'n3',
    position: { x: 0, y: 300 },
    data: { label: 'Node 3' } 
  },
];
const initialEdges = [
  { 
    id: 'n1-n2',
    source: 'n1',
    sourceHandle: 'a',
    target: 'n2',
    type: 'custom-edge',
    label:'connects with',

  },
    { 
    id: 'n2-n3',
    source: 'n2',
    target: 'n3',
    type: 'step',
    label:'connects with'
  }
];
 
export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
 
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const nodeTypes = {
    cardForm: Card,
  }

 
  
  return (
    <div style={{ width: '100vw', height: '100vh', color:'#000' }}>
     <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        colorMode="light"
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} colorMode="light"/>
      </ReactFlow>
    </div>
  );
}