export type WordItem = {
  text: string;
  size: number;
};

export interface Datum {
  word: string;
  frequency: number;
  isVisible: boolean;
}
