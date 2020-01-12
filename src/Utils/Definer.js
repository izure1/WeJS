class Definer {

  static create(name, value) {
    return new Definer(name, value)
  }

  constructor(name, value) {
    this.configurable = true
    this.enumerable = true
    this.writable = true
    this.name = name
    this.value = value
  }

  seal(v) {
    this.configurable = !v
    return this
  }

  hidden(v) {
    this.enumerable = !v
    return this
  }

  final(v) {
    this.writable = !v
    return this
  }

  to(obj) {
    Object.defineProperty(obj, this.name, this)
  }

}


export default Definer