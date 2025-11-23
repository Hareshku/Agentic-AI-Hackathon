import { useCallback } from "react";
import { useReactFlow } from "reactflow";
import { useCanvas } from "../context/CanvasContext";
import { TOOL_MODES } from "../utils/constants";

export default function useCanvasActions() {
  const {
    toolMode,
    setToolMode,
    addNode,
    addEdge,
    deleteNode,
    deleteEdge,
    setSelectedNodeId,
    selectedNodeId,
  } = useCanvas();
  const reactFlow = useReactFlow();

  const handlePaneClick = useCallback(
    (event) => {
      if (toolMode === TOOL_MODES.ZOOM) {
        reactFlow.zoomIn({ duration: 120 });
        setToolMode(TOOL_MODES.SELECT);
        return;
      }
      if (toolMode === TOOL_MODES.ADD_NODE) {
        const position = reactFlow.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        addNode(position);
        setToolMode(TOOL_MODES.SELECT);
      }
    },
    [addNode, reactFlow, setToolMode, toolMode]
  );

  const handleConnect = useCallback(
    (connection) => {
      if (toolMode === TOOL_MODES.ADD_LINK || toolMode === TOOL_MODES.SELECT) {
        addEdge(connection);
        setToolMode(TOOL_MODES.SELECT);
      }
    },
    [addEdge, setToolMode, toolMode]
  );

  const handleNodeClick = useCallback(
    (_, node) => {
      setSelectedNodeId(node.id);
      if (toolMode === TOOL_MODES.DELETE) {
        deleteNode(node.id);
        setToolMode(TOOL_MODES.SELECT);
      }
    },
    [deleteNode, setSelectedNodeId, setToolMode, toolMode]
  );

  const handleEdgeClick = useCallback(
    (_, edge) => {
      if (toolMode === TOOL_MODES.DELETE) {
        setSelectedNodeId(null);
        deleteEdge(edge.id);
        setToolMode(TOOL_MODES.SELECT);
      }
    },
    [deleteEdge, setSelectedNodeId, setToolMode, toolMode]
  );

  const deleteSelected = useCallback(() => {
    if (selectedNodeId) {
      deleteNode(selectedNodeId);
      setToolMode(TOOL_MODES.SELECT);
    }
  }, [deleteNode, selectedNodeId, setToolMode]);

  return {
    handlePaneClick,
    handleConnect,
    handleNodeClick,
    handleEdgeClick,
    deleteSelected,
  };
}
