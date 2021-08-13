export const toList = <T>(obj: Record<string, T>) => {
  return Object.entries(obj).map(([_, value]) => value);
};
