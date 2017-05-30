export type something = boolean|number|string|object

export const isArray = (x: any): x is Array<any> => Array.isArray(x)
export const isString = (x: any): x is string => typeof x === "string"
export const isNum = (x: any): x is number => typeof x === "number"
export const isBool = (x: any): x is boolean => typeof x === "boolean"
export const isObject = (x: any): x is boolean =>
  typeof x === "object" && !isArray(x)
export const isUndefined = (x: any): x is undefined => typeof x === "undefined"
export const isDefined = (x: any): x is something|null => !isUndefined(x)

export const exists = (x: any): x is something => isDefined(x) && x !== null

export const last = (x: Array<any>) => x[x.length - 1]

export const log = (...xs: Array<any>) => {
  console.log(xs.length === 1 ? xs[0] : xs)
  return last(xs)
}

export type Ar<T> = ReadonlyArray<T>
export type OneOrMore<T> = T | Ar<T>
