export function parseTimeHours(time: string): number {
  const t = time.toLowerCase().trim();
  const dayMatch = t.match(/(\d+)\s*(?:d|tage?|tag\b)/);
  if (dayMatch) return Number(dayMatch[1]) * 24;
  const hourMatch = t.match(/(\d+)\s*h/);
  if (hourMatch) return Number(hourMatch[1]);
  return 999;
}

export function buildRecipeSearchText(
  title: string,
  description: string,
  category: string,
  difficulty: string,
  tag: string | undefined,
  ingredients: { name: string }[]
): string {
  return [title, description, category, difficulty, tag, ...ingredients.map((i) => i.name)]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function matchesRecipeFilter(
  filter: string,
  category: string,
  difficulty: string,
  timeHours: number,
  searchText: string
): boolean {
  const cat = category.toLowerCase();
  const diff = difficulty.toLowerCase();
  const text = searchText.toLowerCase();

  switch (filter) {
    case 'all':
      return true;
    case 'anfaenger':
      return diff.includes('einfach') || text.includes('anfänger') || text.includes('anfanger');
    case 'schnell':
      return timeHours <= 6;
    case 'roggen':
      return text.includes('roggen');
    case 'glutenfrei':
      return text.includes('glutenfrei') || text.includes('gluten frei');
    case 'suess':
      return cat.includes('süß') || cat.includes('suss');
    case 'fortgeschritten':
      return diff.includes('fortgeschritten') || diff.includes('profi');
    default:
      return true;
  }
}
