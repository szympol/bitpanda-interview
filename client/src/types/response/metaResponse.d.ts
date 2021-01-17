export interface Meta {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  itemCount: number;
  limit: number;
  nextPage: null | boolean;
  offset: number;
  page: number;
  pageCount: number;
  prevPage: null | boolean;
}
