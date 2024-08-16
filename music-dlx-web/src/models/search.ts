export interface ISearch<T> {
  query: string;
  page: number;
  limit: number;
  total: number;
  has_next: boolean;
  results: T[];
}
