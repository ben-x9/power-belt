import {assert} from "chai"
import {isArray, set, record, insert, append, prepend} from "src"

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
