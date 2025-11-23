const normalizeId = (label, index) =>
  `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "node"}-${index}`;

export function parseAIModel(text = "") {
  if (!text.trim()) return { nodes: [], edges: [] };

  const lines = text
    .split(/\n|,/)
    .map((l) => l.trim())
    .filter(Boolean);

  const nodes = [];
  const edges = [];

  lines.forEach((line, i) => {
    // Edge pattern: A->B or A -> B
    const arrowMatch = line.match(/(.+?)->(.+)/);
    if (arrowMatch) {
      const sourceLabel = arrowMatch[1].trim();
      const targetLabel = arrowMatch[2].trim();
      const sourceId = normalizeId(sourceLabel, i);
      const targetId = normalizeId(targetLabel, i + 1000);

      if (!nodes.find((n) => n.id === sourceId)) {
        nodes.push({
          id: sourceId,
          position: { x: 120 + nodes.length * 40, y: 120 + nodes.length * 30 },
          data: { label: sourceLabel, type: "variable", description: "" },
        });
      }
      if (!nodes.find((n) => n.id === targetId)) {
        nodes.push({
          id: targetId,
          position: { x: 260 + nodes.length * 30, y: 160 + nodes.length * 25 },
          data: { label: targetLabel, type: "variable", description: "" },
        });
      }

      edges.push({
        id: `e-${sourceId}-${targetId}-${i}`,
        source: sourceId,
        target: targetId,
        label: "influences",
      });
      return;
    }

    // Otherwise treat as node definition
    const label = line.replace(/^[-•]\s*/, "");
    if (!label) return;
    const id = normalizeId(label, i);
    if (!nodes.find((n) => n.id === id)) {
      nodes.push({
        id,
        position: { x: 120 + nodes.length * 36, y: 100 + nodes.length * 22 },
        data: { label, type: "variable", description: "" },
      });
    }
  });

  return { nodes, edges };
}

export default parseAIModel;
