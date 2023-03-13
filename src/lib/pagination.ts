export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IPaginationResult<T> {
  data: T[];
  hasNextPage: boolean;
}

export interface IPaginationWithCountResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}

export const infinityPagination = <T>(data: T[], options: IPaginationOptions): IPaginationResult<T> => {
  return {
    data,
    hasNextPage: data.length === options.limit,
  };
};

export const infinityPaginationWithCount = <T>(
  [data, total]: [T[], number],
  options: IPaginationOptions,
): IPaginationWithCountResult<T> => {
  return {
    data,
    total,
    page: options.page,
    limit: options.limit,
    hasNextPage: data.length === options.limit,
  };
};
