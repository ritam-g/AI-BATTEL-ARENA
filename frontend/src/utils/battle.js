const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const toSafeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const createBattleMessage = (type, payload = {}) => ({
  id: createId(type),
  type,
  ...payload,
});

export const normalizeWinner = (winner) => {
  if (typeof winner !== "string") {
    return "";
  }

  const normalized = winner.trim().toLowerCase();
  return normalized === "mistral" || normalized === "cohere" ? normalized : "";
};

export const getWinnerKey = (winner) => {
  const normalizedWinner = normalizeWinner(winner);

  if (normalizedWinner === "mistral") {
    return "solution_1";
  }

  if (normalizedWinner === "cohere") {
    return "solution_2";
  }

  return null;
};

export const getWinnerLabel = (winner) => {
  const normalizedWinner = normalizeWinner(winner);

  if (normalizedWinner === "mistral") {
    return "Mistral";
  }

  if (normalizedWinner === "cohere") {
    return "Cohere";
  }

  return "Pending";
};

export const normalizeBattleResult = (result, fallbackProblem = "") => ({
  problem: typeof result?.problem === "string" && result.problem.trim()
    ? result.problem
    : fallbackProblem,
  solution_1: typeof result?.solution_1 === "string" ? result.solution_1 : "",
  solution_2: typeof result?.solution_2 === "string" ? result.solution_2 : "",
  judgeMent: {
    solution_1_score: toSafeNumber(result?.judgeMent?.solution_1_score),
    solution_2_score: toSafeNumber(result?.judgeMent?.solution_2_score),
    solution_1_reasoning: typeof result?.judgeMent?.solution_1_reasoning === "string"
      ? result.judgeMent.solution_1_reasoning
      : "",
    solution_2_reasoning: typeof result?.judgeMent?.solution_2_reasoning === "string"
      ? result.judgeMent.solution_2_reasoning
      : "",
    winner: normalizeWinner(result?.judgeMent?.winner),
  },
});
