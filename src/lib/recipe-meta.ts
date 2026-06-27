export const DIFFICULTY_ICONS: Record<string, string> = {
  Easy: '⚡',
  Medium: '🔸',
  Advanced: '🔥',
};

export function formatDifficulty(level: string): string {
  const icon = DIFFICULTY_ICONS[level];
  return icon ? `${icon} ${level}` : level;
}
