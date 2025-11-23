import backend from "./backend";

export async function processModel(payload) {
  const { data } = await backend.post("/api/process-model", payload);
  return data;
}

export async function saveDiagram(payload) {
  const { data } = await backend.post("/api/save-diagram", payload);
  return data;
}

export async function loadDiagram(projectId) {
  const { data } = await backend.get(`/api/load-diagram/${projectId}`);
  return data;
}

export async function parseModelText(text) {
  const { data } = await backend.post("/api/parse-model", { text });
  return data;
}

export default { processModel, saveDiagram, loadDiagram, parseModelText };
