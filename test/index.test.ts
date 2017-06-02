import {assert} from "chai"
import {isArray, set, record} from "src"

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
  it("should set an array value at index when passed an array", () => {
    const array = [1, 2, 3]
    const $array = set(array, 1, 22)
    assert.notEqual($array, array)
    assert.deepEqual($array, [1, 22, 3])
  })
})
