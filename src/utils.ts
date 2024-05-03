import { Datum } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FuncType<T extends any[]> = (...args: T) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends any[]>(
  func: FuncType<T>,
  delay: number
): (...args: T) => void {
  let timeoutId: NodeJS.Timeout;

  return function debouncedFunction(...args: T) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export function removeSpecialCharacters(str: string) {
  // Define a regular expression to match any punctuation or special characters
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

  // Replace all occurrences of punctuation and special characters with an empty string
  return str.replace(regex, "");
}

export function generateWordCloud(data: string[]): Datum[] {
  const wordCloudData: Datum[] = [];
  const map = new Map();

  data.forEach((entry) => {
    const key = entry.toLowerCase();
    if (map.has(key)) {
      const value = map.get(key);
      map.set(key, value + 1);
    } else if (key.length > 0) {
      map.set(key, 1);
    }
  });

  for (const [word, frequency] of map) {
    wordCloudData.push({
      word,
      frequency,
      isVisible: true,
    });
  }

  wordCloudData.sort((a, b) => b.frequency - a.frequency);

  return wordCloudData;
}
