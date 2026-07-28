export type SortDirection = "asc" | "desc";

export type CollectionCriterion<T> = (item: T) => boolean;

export function filterByCriterion<T>(items: T[], criterion: CollectionCriterion<T>): T[] {
  return items.filter((item: T) => criterion(item));
}

export function filterByCriteria<T>(items: T[], criteria: CollectionCriterion<T>[]): T[] {
  if (criteria.length === 0) {
    return [...items];
  }

  return items.filter((item: T) => criteria.every((criterion: CollectionCriterion<T>) => criterion(item)));
}

export function sortByNumberField<T>(
  items: T[],
  selector: (item: T) => number,
  direction: SortDirection = "asc"
): T[] {
  const multiplier: number = direction === "asc" ? 1 : -1;

  return [...items].sort((left: T, right: T) => (selector(left) - selector(right)) * multiplier);
}

export function sortByStringField<T>(
  items: T[],
  selector: (item: T) => string,
  direction: SortDirection = "asc"
): T[] {
  const multiplier: number = direction === "asc" ? 1 : -1;

  return [...items].sort(
    (left: T, right: T) => selector(left).localeCompare(selector(right)) * multiplier
  );
}

export function sortByMany<T>(items: T[], comparators: Array<(left: T, right: T) => number>): T[] {
  return [...items].sort((left: T, right: T) => {
    for (const comparator of comparators) {
      const result: number = comparator(left, right);

      if (result !== 0) {
        return result;
      }
    }

    return 0;
  });
}

export function groupBy<T, K extends string>(items: T[], selector: (item: T) => K): Record<K, T[]> {
  return items.reduce((groups: Record<K, T[]>, item: T) => {
    const key: K = selector(item);
    const currentGroup: T[] = groups[key] ?? [];

    return {
      ...groups,
      [key]: [...currentGroup, item]
    };
  }, {} as Record<K, T[]>);
}