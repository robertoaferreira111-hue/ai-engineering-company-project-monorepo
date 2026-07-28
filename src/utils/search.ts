export function linearSearchIndex<T>(items: T[], predicate: (item: T) => boolean): number {
  for (let index: number = 0; index < items.length; index += 1) {
    if (predicate(items[index])) {
      return index;
    }
  }

  return -1;
}

export function linearSearch<T>(items: T[], predicate: (item: T) => boolean): T | null {
  const index: number = linearSearchIndex(items, predicate);

  return index === -1 ? null : items[index];
}

export function binarySearchIndex<T>(
  items: T[],
  target: T,
  compare: (left: T, right: T) => number
): number {
  let start: number = 0;
  let end: number = items.length - 1;

  while (start <= end) {
    const middle: number = Math.floor((start + end) / 2);
    const comparison: number = compare(items[middle], target);

    if (comparison === 0) {
      return middle;
    }

    if (comparison < 0) {
      start = middle + 1;
      continue;
    }

    end = middle - 1;
  }

  return -1;
}

export function binarySearch<T>(items: T[], target: T, compare: (left: T, right: T) => number): T | null {
  const index: number = binarySearchIndex(items, target, compare);

  return index === -1 ? null : items[index];
}