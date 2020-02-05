class Collider {

  constructor() {
    this.a = null
    this.b = null
  }

  setBetween(a, b) {
    this.a = a
    this.b = b
    return this
  }

}


export default Collider