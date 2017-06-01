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

export type List<T> = ReadonlyArray<T>

export type Dict<T> = {
  readonly [key: string]: T
}
export type Obj<T> = Dict<T>

export type Record<T> = Readonly<T>

export type OneOrMore<T> = T | List<T>

export const list = <T>(...x: Array<T>): List<T> => x
export const dict = <T>(object: Obj<T>): Dict<T> => object
export const record = <T>(object: T): Record<T> => object

export type Update<ActionT> = (update: ActionT) => void
export type Guid = string
export type Nothing = null | undefined
export type Maybe<T> = T | Nothing

// const set = <T, K extends keyof T>(thing: T, prop: K, value: T[K]): T => {
//   return thing
// }

// const myMap: ReadMap<number> = {
//   a: 1,
//   b: 2,
//   c: 3
// }
// const myArray: ReadArray<number> = [1, 2, 3]


// const myNewMap = set(myMap, "a", 5)
// const myNewArray = set(myArray, 0, 5)


// type T1 = keyof {[key: string]: number}
// type T2 = keyof {[key: number]: number}






// export const record = <T>(value: T) => value as Readonly<T>
// export const list = <T>(value: T[]) => value as ReadArray<T>

// const a = [1, 2, 3]
// type ka<T> = keyof ReadArray<T>

// type Set = <R, K extends keyof R>(rec: R, key: K, val: R[K]) => R
// type Set = <T>(vec: Array<T>, index: number, val: R[K]) => R

// const set: Set = (rec: any, key: any, val: any) => {

// }



// type Wrapper<T> = {
//     set<K extends keyof T>(k: K, v: T[K]) : IWrapper<T>
//     setIn<K extends keyof T, K2 extends keyof T[K]>(k: K, k2: K2, v: T[K][K2]) : IWrapper<T>
//     setIn<K extends keyof T, K2 extends keyof T[K], K3 extends keyof T[K][K2]>(k: K, k2: K2, k3: K3, v: T[K][K2][K3]): IWrapper<T>
//     setIn<K extends keyof T, K2 extends keyof T[K], K3 extends keyof T[K][K2], K4 extends keyof T[K][K2][K3]>(k: K, k2: K2, k3: K3, k4: K4, v: T[K][K2][K3][K4]): IWrapper<T>
//    // .......
// }
