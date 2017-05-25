import {assert} from "chai"
import {isArray} from "src"

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
