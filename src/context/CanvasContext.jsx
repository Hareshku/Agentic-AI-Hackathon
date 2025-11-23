import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import { applyEdgeChanges, applyNodeChanges } from "reactflow";
import { TOOL_MODES, DEFAULT_PROJECT_NAME } from "../utils/constants";

const CanvasContext = createContext(null);

const initialNodes = [
  {
    id: "n-1",
    position: { x: 250, y: 150 },
    data: { label: "Population", type: "variable", description: "Total people" },
  },
  {
    id: "n-2",
    position: { x: 520, y: 240 },
    data: { label: "Birth rate", type: "variable", description: "New births per year" },
  },
];

const initialEdges = [
  { id: "e-1-2", source: "n-1", target: "n-2", label: "influences" },
];

export function CanvasProvider({ children }) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [toolMode, setToolMode] = useState(TOOL_MODES.SELECT);
  const [projectName, setProjectName] = useState(DEFAULT_PROJECT_NAME);

  const addNode = useCallback(
    (position, data = {}, customId) => {
      const id = customId || `node-${Date.now()}`;
      const index = nodes.length + 1;
      const newNode = {
        id,
        position: position || { x: 200 + index * 20, y: 200 + index * 14 },
        data: {
          label: data.label || `Node ${index}`,
          type: data.type || "variable",
          description: data.description || "",
        },
      };
      setNodes((prev) => [...prev, newNode]);
      setSelectedNodeId(id);
      return newNode;
    },
    [nodes.length]
  );

  const addEdge = useCallback((edge) => {
    setEdges((prev) => [
      ...prev,
      {
        id: edge.id || `e-${edge.source}-${edge.target}-${Date.now()}`,
        source: edge.source,
        target: edge.target,
        label: edge.label || "influences",
      },
    ]);
  }, []);

  const deleteEdge = useCallback((id) => {
    setEdges((prev) => prev.filter((edge) => edge.id !== id));
  }, []);

  const updateNode = useCallback((id, data) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  }, []);

  const deleteNode = useCallback((id) => {
    setNodes((prev) => prev.filter((n) => n.id !== id));
    setEdges((prev) => prev.filter((e) => e.source !== id && e.target !== id));
    setSelectedNodeId(null);
  }, []);

  const onNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const value = useMemo(
    () => ({
      projectName,
      setProjectName,
      nodes,
      edges,
      selectedNodeId,
      setSelectedNodeId,
      toolMode,
      setToolMode,
      addNode,
      addEdge,
      updateNode,
      deleteNode,
      deleteEdge,
      onNodesChange,
      onEdgesChange,
    }),
    [
      projectName,
      nodes,
      edges,
      selectedNodeId,
      toolMode,
      addNode,
      addEdge,
      updateNode,
      deleteNode,
      deleteEdge,
      onNodesChange,
      onEdgesChange,
    ]
  );

  return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>;
}

export function useCanvas() {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error("useCanvas must be used within CanvasProvider");
  return ctx;
}
