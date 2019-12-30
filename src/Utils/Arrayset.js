class Arrayset extends Array {

  constructor() {
    super(...arguments)
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