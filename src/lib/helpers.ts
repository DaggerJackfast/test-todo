interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export const toLowerCase = (value: string): string => value.toLowerCase();

export const trim = (value: string): string => value.trim();

export const toDate = (value: string): Date => new Date(value);

export const toBoolean = (value: string): boolean => {
  value = value.toLowerCase();
  return value === 'true' || value === '1' ? true : false;
};

export const toNumber = (value: string, opts: ToNumberOptions = {}): number => {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }

  return newValue;
};
