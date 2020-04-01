export function StringToEnum<T>(enumObj: T, str: string): T[keyof T] {
  return enumObj[str];
}

// strict input version
// export function StringToEnum<T>(enumObj: T, str: keyof T): T[keyof T] {
//   return enumObj[str];
// }
