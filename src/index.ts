import {some, findIndex} from "lodash"

export const has = some

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
  console.log(xs[0], ...xs.slice(1))
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

export interface HasId {id: string|number}

export function set<T>(object: T, props: Partial<T>): T
export function set<T, K extends keyof T>(object: T, key: K, val: T[K]): T
export function set<T>(list: List<T>, index: number, val: Maybe<T>): List<T>
export function set<T extends HasId>(list: List<T>, val: T): List<T>
export function set<T, K extends keyof T>(
    objOrList: T | List<T>,
    propsOrKeyOrIndexOrVal: Partial<T> | K | number | Maybe<T>,
    val?: T[K] | Maybe<T>) {
  if (isList(objOrList)) {
    let list = objOrList as List<T>
    const update = (index: number, val: Maybe<T>) => {
      if (index >= 0 && val !== list[index]) {
        const $list = list.slice() // clone the list
        if (exists(val)) {
          $list.splice(index, 1, val) // replace the val at index
        } else {
          $list.splice(index, 1) // remove the val at index
        }
        list = $list
      }
    }
    if (isNum(propsOrKeyOrIndexOrVal)) {
      const index = propsOrKeyOrIndexOrVal as number
      update(index, val as Maybe<T>)
    } else {
      const $val = propsOrKeyOrIndexOrVal as T & HasId
      const $list = list as any as List<HasId>
      const index = findIndex($list, {id: $val.id})
      update(index, $val)
    }
    return list
  } else {
    const object = objOrList as T
    const propsOrKey = propsOrKeyOrIndexOrVal
    const $val = val as T[K]
    if (isString(propsOrKey)) {
      const key = propsOrKey
      const $val = val as T[K]
      if (object[key] !== val) {
        return Object.assign({}, object, {[key as string]: val})
      } else {
        return object
      }
    } else {
      const props = propsOrKey as any
      if (has(props, (val, key: keyof Partial<T>) =>
          props[key] !== object[key])) {
        return Object.assign({}, object, props)
      } else {
        return object
      }
    }
  }
}

export const insert = <T>(list: List<T>, index: number, val: Maybe<T>): List<T> => {
  if (exists(val)) {
    const $list = list.slice() // clone the list
    $list.splice(index, 0, val) // insert the val at index
    return $list
  }
  return list
}

export const append = <T>(list: List<T>, val: Maybe<T>): List<T> =>
  exists(val) ? [...list, val] : list

export const prepend = <T>(list: List<T>, val: Maybe<T>): List<T> =>
  exists(val) ? [val, ...list] : list

export interface DeepList<T> extends List<T | DeepList<T>> {}
export type Deep<T> = T | DeepList<T>
