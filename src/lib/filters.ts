import { Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

export const buildFilterByDate =
  (options, field) =>
  (filter): object => {
    if (options.start && options.end) {
      return {
        ...filter,
        [field]: Between(options.start, options.end),
      };
    } else if (options.start) {
      return {
        ...filter,
        [field]: MoreThanOrEqual(options.start),
      };
    } else if (options.end) {
      return {
        ...filter,
        [field]: LessThanOrEqual(options.end),
      };
    }
    return filter;
  };

export const buildFilterByEntityId =
  (options, optionKey, field) =>
  (filter): object => {
    if (options[optionKey]) {
      return {
        ...filter,
        [field]: {
          id: options[optionKey],
        },
      };
    }
    return filter;
  };

export const buildFilterByFieldName =
  (options, optionKey, field) =>
  (filter): object => {
    if (options[optionKey]) {
      return {
        ...filter,
        [field]: options[optionKey],
      };
    }
    return filter;
  };
