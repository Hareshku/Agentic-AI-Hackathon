export const isNonEmpty = (value) => typeof value === "string" && value.trim().length > 0;

export const clampString = (value, max = 140) =>
  typeof value === "string" ? value.slice(0, max) : "";
