export function StringToEnum<T>(enumObj: T, str: keyof T): T[keyof T] {
  return enumObj[str];
}
