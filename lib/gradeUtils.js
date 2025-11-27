export function parseGrade(rawGrade, fallback = 12) {
  if (rawGrade === undefined || rawGrade === null) {
    return fallback;
  }

  const match = String(rawGrade).match(/\d{1,2}/);
  if (!match) {
    return fallback;
  }

  const parsed = Number.parseInt(match[0], 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return parsed;
}

export function buildGradeLabel(rawGrade, fallback = 12) {
  const gradeNumber = parseGrade(rawGrade, fallback);
  return `Grade ${gradeNumber}`;
}
