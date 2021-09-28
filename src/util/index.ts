import { parse } from "date-fns";

export const toList = <T>(obj: Record<string, T>) => {
  return Object.entries(obj).map(([_, value]) => value);
};

export const dateStringToDate = (input: string) => {
  const d = parse(input, "yyyy-MM-dd HH:mm:ss", new Date());
  return d;
};
