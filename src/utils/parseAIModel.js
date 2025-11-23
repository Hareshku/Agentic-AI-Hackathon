const normalizeId = (label, index) =>
  `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "node"}-${index}`;

export function parseAIModel(text = "") {
  if (!text.trim()) return { nodes: [], edges: [] };

  const lines = text
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const nodes = [];
  const edges = [];
  let inVariablesSection = false;
  let inLinksSection = false;

  lines.forEach((line, i) => {
    // Check for section headers
    if (line.match(/^VARIABLES:/i)) {
      inVariablesSection = true;
      inLinksSection = false;
      return;
    }
    if (line.match(/^LINKS:/i)) {
      inVariablesSection = false;
      inLinksSection = true;
      return;
    }

    // Skip non-list items when in sections
    if (inVariablesSection || inLinksSection) {
      if (!line.startsWith("-") && !line.startsWith("•")) {
        inVariablesSection = false;
        inLinksSection = false;
      }
    }

    // Parse variables section
    if (inVariablesSection && (line.startsWith("-") || line.startsWith("•"))) {
      const label = line.replace(/^[-•]\s*/, "").trim();
      if (!label) return;
      const id = normalizeId(label, i);
      if (!nodes.find((n) => n.id === id)) {
        nodes.push({
          id,
          position: { x: 150 + nodes.length * 50, y: 100 + nodes.length * 40 },
          data: { label, type: "variable", description: "" },
        });
      }
      return;
    }

    // Parse links section - handles "A -> B (positive)" format
    if (inLinksSection && (line.startsWith("-") || line.startsWith("•"))) {
      const linkText = line.replace(/^[-•]\s*/, "").trim();
      const arrowMatch = linkText.match(/(.+?)\s*->\s*(.+?)(?:\s*\(([^)]+)\))?$/);

      if (arrowMatch) {
        const sourceLabel = arrowMatch[1].trim();
        const targetLabel = arrowMatch[2].trim();
        const linkType = arrowMatch[3]?.trim() || "influences";

        const sourceId = normalizeId(sourceLabel, i);
        const targetId = normalizeId(targetLabel, i + 1000);

        // Add source node if not exists
        if (!nodes.find((n) => n.id === sourceId)) {
          nodes.push({
            id: sourceId,
            position: { x: 150 + nodes.length * 50, y: 100 + nodes.length * 40 },
            data: { label: sourceLabel, type: "variable", description: "" },
          });
        }

        // Add target node if not exists
        if (!nodes.find((n) => n.id === targetId)) {
          nodes.push({
            id: targetId,
            position: { x: 300 + nodes.length * 40, y: 150 + nodes.length * 35 },
            data: { label: targetLabel, type: "variable", description: "" },
          });
        }

        edges.push({
          id: `e-${sourceId}-${targetId}-${i}`,
          source: sourceId,
          target: targetId,
          label: linkType,
        });
      }
      return;
    }

    // Fallback: Parse simple arrow format anywhere in text
    const arrowMatch = line.match(/(.+?)\s*->\s*(.+?)(?:\s*\(([^)]+)\))?$/);
    if (arrowMatch) {
      const sourceLabel = arrowMatch[1].trim();
      const targetLabel = arrowMatch[2].trim();
      const linkType = arrowMatch[3]?.trim() || "influences";
      const sourceId = normalizeId(sourceLabel, i);
      const targetId = normalizeId(targetLabel, i + 1000);

      if (!nodes.find((n) => n.id === sourceId)) {
        nodes.push({
          id: sourceId,
          position: { x: 150 + nodes.length * 50, y: 100 + nodes.length * 40 },
          data: { label: sourceLabel, type: "variable", description: "" },
        });
      }
      if (!nodes.find((n) => n.id === targetId)) {
        nodes.push({
          id: targetId,
          position: { x: 300 + nodes.length * 40, y: 150 + nodes.length * 35 },
          data: { label: targetLabel, type: "variable", description: "" },
        });
      }

      edges.push({
        id: `e-${sourceId}-${targetId}-${i}`,
        source: sourceId,
        target: targetId,
        label: linkType,
      });
      return;
    }

    // Fallback: treat as standalone node
    const label = line.replace(/^[-•]\s*/, "").trim();
    if (label && label.length > 2 && !label.match(/^(VARIABLES|LINKS|Here|This|Would|Let)/i)) {
      const id = normalizeId(label, i);
      if (!nodes.find((n) => n.id === id)) {
        nodes.push({
          id,
          position: { x: 150 + nodes.length * 50, y: 100 + nodes.length * 40 },
          data: { label, type: "variable", description: "" },
        });
      }
    }
  });

  return { nodes, edges };
}

export default parseAIModel;
