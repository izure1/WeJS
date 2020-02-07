class Arrayset extends Array {

  static makeReactive(obj) {
    const proto = obj.__proto__
    Object.defineProperty(obj, '__proto__', {
      get() { return proto },
      set(v) { proto.__proto__ = v }
    })
  }

  constructor(...args) {
    super(...args)
    Arrayset.makeReactive(this)
  }

  add(v) {
    const i = this.indexOf(v)
    if (i !== -1) return i
    return this.push(v)
  }

  has(v) {
    return this.indexOf(v) !== -1
  }

  clear() {
    this.length = 0
  }

  delete(v) {
    const i = this.indexOf(v)
    if (i === -1) return false
    this.splice(i, 1)
    return true
  }

}


export default Arrayset