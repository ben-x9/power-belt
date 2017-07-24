import {assert} from "chai"
import {isArray, set, record, insert, append, prepend, clean, collect, move, merge} from "src"

describe("isArray", () => {
  it("should return true when passed an array", () => {
    assert.strictEqual(isArray([]), true)
  })
  it("should return false when passed a non-array", () => {
    assert.strictEqual(isArray({}), false)
    assert.strictEqual(isArray(""), false)
    assert.strictEqual(isArray(20), false)
  })
})

describe("set", () => {
  it("should set a property on an object when passed an object, a key and a value", () => {
    const object = {a: 1, b: 2, c: 3}
    const $object = set(object, "a", 11)
    assert.notEqual($object, object)
    assert.deepEqual($object, {a: 11, b: 2, c: 3})
  })
  it("should set properties on the first object when passed two objects", () => {
    const object = {a: 1, b: 2, c: 3}
    const $object = set(object, {a: 11, b: 22})
    assert.notEqual($object, object)
    assert.deepEqual($object, {a: 11, b: 22, c: 3})
  })
  it("should set an array value at index when passed an array, index and value", () => {
    const array = [1, 2, 3]
    const $array = set(array, 1, 22)
    assert.notEqual($array, array)
    assert.deepEqual($array, [1, 22, 3])
  })
  it("should set an array value by id when passed an array, value and no index", () => {
    const array =
      [{id: 1, val: "Fri"}, {id: 2, val: "Sat"}, {id: 3, val: "Mon"}]
    const $array = set(array, {id: 3, val: "Sun"})
    assert.notEqual($array, array)
    assert.deepEqual($array,
      [{id: 1, val: "Fri"}, {id: 2, val: "Sat"}, {id: 3, val: "Sun"}])
  })
  it("should remove an array value at index when passed an array and a null or undefined val", () => {
    const array = [1, 2, 3]
    const $array = set(array, 1, null)
    assert.notEqual($array, array)
    assert.deepEqual($array, [1, 3])
    const $$array = set(array, 1, undefined)
    assert.notEqual($$array, array)
    assert.deepEqual($$array, [1, 3])
  })
  it("should not do anything if values are the same", () => {
    const object = {a: 1, b: 2, c: 3}
    const $object = set(object, "a", 1)
    assert.strictEqual($object, object)
    const $$object = set(object, {a: 1})
    assert.strictEqual($$object, object)
    const array = [1, 2, 3]
    const $array = set(array, 0, 1)
    assert.strictEqual($array, array)
  })
})

describe("insert", () => {
  it("should insert an item into an array", () => {
    const array = [1, 3, 4]
    const $array = insert(array, 1, 2)
    assert.notEqual($array, array)
    assert.deepEqual($array, [1, 2, 3, 4])
  })
})

describe("append", () => {
  it("should add an item to the end of the array", () => {
    const array = [1, 2, 3]
    const $array = append(array, 4)
    assert.notEqual($array, array)
    assert.deepEqual($array, [1, 2, 3, 4])
  })
})

describe("prepend", () => {
  it("should add an item to the end of the array", () => {
    const array = [1, 2, 3]
    const $array = prepend(array, 0)
    assert.notEqual($array, array)
    assert.deepEqual($array, [0, 1, 2, 3])
  })
})

describe("clean", () => {
  it("should remove all null and undefined values from the array", () => {
    const array = [1, 2, null, 4, 5]
    const $array = clean(array)
    assert.notEqual($array as typeof array, array)
    assert.deepEqual($array, [1, 2, 4, 5])
  })
})

describe("collect", () => {
  it("should collect only the element that we processed", () => {
    const arr = [1, 2, 3, 1, 2, 3, 1, 2, 3]

    const collected = collect(arr, item => {
      switch (item) {
        case 1:
          return 2
        case 2:
          return 4
        default:
          return null
      }
    })

    assert.deepEqual(collected, [2, 4, 2, 4, 2, 4])
  })

  it("should collect nothing if no item match", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const collected = collect(arr, item => null)
    assert.deepEqual(collected, [])
  })
})

describe("move", () => {
  it("should move an element to a new position in the array", () => {
    const array = ["one", "two", "four", "three"]
    const $array = move(array, "four", 3)
    assert.notEqual($array, array)
    assert.deepEqual($array, ["one", "two", "three", "four"])
  })
})

describe("merge", () => {
  it("should merge two objects, ignoring properties on the second object that are undefined", () => {
    interface Item {a: number, b: number, c: number}
    const item: Item = {a: 1, b: 2, c: 3}
    const change: Partial<Item> = {a: undefined, b: undefined, c: 6}
    assert.deepEqual(merge(item, change), {a: 1, b: 2, c: 6})
  })
})
