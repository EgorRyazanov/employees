type NonNull<T> = T extends null ? never : T;

type RemoveNull<T> = {
  [K in keyof T]: NonNull<T[K]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeEmptyValues<T extends Record<string, any>, R = Partial<RemoveNull<T>>>(object: T): R {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (value === undefined || value === '' || value === null) {
      return acc;
    }
    return {
      ...acc,
      [key]: value,
    };
  }, {} as R);
}
