// Yes/No question starters for different languages
const YES_NO_STARTERS = {
  english: [
    "is",
    "are",
    "do",
    "does",
    "can",
    "will",
    "should",
    "did",
    "has",
    "have",
    "was",
    "were",
    "would",
    "could",
  ],
  danish: [
    "er",
    "kan",
    "vil",
    "gør",
    "har",
    "var",
    "ville",
    "kunne",
    "må",
    "bør",
    "skal",
    "skulle",
  ],
  spanish: [
    "es",
    "son",
    "hace",
    "puede",
    "debe",
    "hará",
    "está",
    "están",
    "hizo",
    "hizo",
    "será",
    "pueden",
    "deben",
    "tiene",
    "tienen",
  ],
};

/**
 * Validates if the input is a yes/no question in English, Danish, or Spanish
 * @param input - The user input string
 * @returns boolean - true if valid yes/no question, false otherwise
 */
export const isValidYesNoQuestion = (input: string): boolean => {
  const trimmed = input.trim();
  if (!trimmed) return false;

  // Normalize the input: convert to lowercase and remove leading/trailing whitespace
  let normalized = trimmed.toLowerCase().trim();

  // Remove Spanish inverted question mark if present
  if (normalized.startsWith("¿")) {
    normalized = normalized.slice(1).trim();
  }

  // Remove trailing question mark for processing (we check it optionally later)
  const hasQuestionMark = normalized.endsWith("?");
  if (hasQuestionMark) {
    normalized = normalized.slice(0, -1).trim();
  }

  // Extract the first word(s) - handle articles and common prefixes
  const words = normalized.split(/\s+/).filter((word) => word.length > 0);
  if (words.length === 0) return false;

  const firstWord = words[0];
  const secondWord = words[1] || "";

  // Check English starters
  const englishStarters = YES_NO_STARTERS.english;
  if (englishStarters.some((starter) => firstWord === starter)) {
    return true;
  }

  // Check for English questions with articles (e.g., "Is the", "Are the")
  if (
    (firstWord === "is" ||
      firstWord === "are" ||
      firstWord === "was" ||
      firstWord === "were") &&
    ["the", "a", "an", "this", "that", "these", "those"].includes(secondWord)
  ) {
    return true;
  }

  // Check Danish starters
  const danishStarters = YES_NO_STARTERS.danish;
  if (danishStarters.some((starter) => firstWord === starter)) {
    return true;
  }

  // Check Spanish starters
  const spanishStarters = YES_NO_STARTERS.spanish;
  if (spanishStarters.some((starter) => firstWord === starter)) {
    return true;
  }

  return false;
};
