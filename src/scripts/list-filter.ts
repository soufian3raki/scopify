export function initListFilter(options: {
  searchInputId: string;
  filterContainerId: string;
  listContainerId: string;
  emptyStateId: string;
  itemSelector: string;
  getSearchText: (item: HTMLElement) => string;
  matchesFilter: (filter: string, item: HTMLElement) => boolean;
}) {
  const searchInput = document.getElementById(options.searchInputId) as HTMLInputElement | null;
  const filterContainer = document.getElementById(options.filterContainerId);
  const listContainer = document.getElementById(options.listContainerId);
  const emptyState = document.getElementById(options.emptyStateId);

  if (!filterContainer || !listContainer) return;

  let activeFilter = 'all';

  const getItems = () =>
    [...listContainer.querySelectorAll<HTMLElement>(options.itemSelector)];

  const getFilterButtons = () =>
    [...filterContainer.querySelectorAll<HTMLButtonElement>('.chip[data-filter]')];

  function normalizeQuery(value: string) {
    return value.trim().toLowerCase();
  }

  function matchesSearch(item: HTMLElement, query: string) {
    if (!query) return true;
    return options.getSearchText(item).includes(query);
  }

  function applyFilters() {
    const query = normalizeQuery(searchInput?.value ?? '');
    const items = getItems();
    let visibleCount = 0;

    items.forEach((item) => {
      const visible =
        matchesSearch(item, query) && options.matchesFilter(activeFilter, item);
      item.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount += 1;
    });

    emptyState?.classList.toggle('is-hidden', visibleCount > 0);
  }

  getFilterButtons().forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter ?? 'all';
      getFilterButtons().forEach((btn) => btn.classList.toggle('active', btn === button));
      applyFilters();
    });
  });

  searchInput?.addEventListener('input', applyFilters);

  applyFilters();
}
