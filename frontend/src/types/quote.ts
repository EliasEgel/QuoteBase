export type Quote = {
  id: number;
  text: string;
  author: string;
  source?: string;
  isFavoritedByUser: boolean;
  isCreatedByUser: boolean;
};
export type PagedResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
};