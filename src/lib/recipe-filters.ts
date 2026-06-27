export function parseTimeHours(time: string): number {
  const t = time.toLowerCase().trim();
  const dayMatch = t.match(/(\d+)\s*(?:d|day|days|tage?|tag\b)/);
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
    case 'beginner':
      return diff.includes('easy') || text.includes('beginner');
    case 'quick':
      return timeHours <= 6;
    case 'rye':
      return text.includes('rye') || text.includes('roggen');
    case 'glutenfree':
      return text.includes('gluten-free') || text.includes('gluten free') || text.includes('glutenfrei');
    case 'sweet':
      return cat.includes('sweet') || cat.includes('süß') || cat.includes('suss');
    case 'advanced':
      return diff.includes('advanced') || diff.includes('fortgeschritten');
    default:
      return true;
  }
}
