import { useState, useCallback, useRef } from 'react';
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
import { Card, CustomEdge } from './Components';


const edgeTypes = {
    'custom-edge': CustomEdge
}

const initialNodes = [
  {
    id: 'n1',
    type: 'cardForm',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    deletable: false,
    dragHandle: '.card-drag-handle'
  }
];
const initialEdges = [];
 
export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const reactFlowRef = useRef(null);

  const onInit = useCallback((instance) => {
    reactFlowRef.current = instance;
    instance.fitView({ padding: 0.2 });
  }, []);

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
        onInit={onInit}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        colorMode="light"
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} colorMode="light"/>
      </ReactFlow>
    </div>
  );
}