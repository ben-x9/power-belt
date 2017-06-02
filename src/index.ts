export type something = boolean|number|string|object

export const isArray = (x: any): x is Array<any> => Array.isArray(x)
export const isList = isArray
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

export const debug = <T>(expr: T): T => {
  debugger
  return expr
}

// immutable types
export type List<T> = ReadonlyArray<T>
export type Dict<T> = {readonly [key: string]: T}
export type Obj<T> = Dict<T>
export type Record<T> = Readonly<T>
export const list = <T>(...x: Array<T>): List<T> => x
export const dict = <T>(object: Obj<T>): Dict<T> => object
export const record = <T>(object: T): Record<T> => object

export type OneOrMore<T> = T | List<T>

export type Update<ActionT> = (update: ActionT) => void
export type Guid = string
export type Nothing = null | undefined
export type Maybe<T> = T | Nothing

export function set<T>(object: T, props: Partial<T>): T
export function set<T, K extends keyof T>(object: T, key: K, val: T[K]): T
export function set<T>(list: List<T>, index: number, val: T): List<T>
export function set<T, K extends keyof T>(
    objOrList: T | List<T>,
    propsOrKeyOrIndex: Partial<T> | K | number,
    val?: T[K] | T) {
  if (isList(objOrList)) {
    const list = objOrList as List<T>
    const index = propsOrKeyOrIndex as number
    const $val = val as T
    const $list = list.slice() // clone the list
    $list.splice(index, 1, $val) // replace the val at index
    return $list
  } else {
    const object = objOrList
    const propsOrKey = propsOrKeyOrIndex
    const $val = val as T[K]
    return Object.assign({}, object, isString(propsOrKey) ?
      {[propsOrKey as string]: $val} :
      propsOrKey)
  }
}

export interface DeepList<T> extends List<T | DeepList<T>> {}
export type Deep<T> = T | DeepList<T>
