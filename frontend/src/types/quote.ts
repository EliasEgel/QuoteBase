export type Quote = {
  id: number;
  text: string;
  author: string;
  source?: string;
  isFavoritedByUser: boolean;
};