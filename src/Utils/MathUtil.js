class Angler {

  static radToDeg(v) {
    return v * (180 / Math.PI)
  }

  static degToRad(v) {
    return v * (Math.PI / 180)
  }

  constructor() {
    this.__radian = 0
  }

  fromRadian(v) {
    this.__radian = v
    return this
  }

  fromDegree(v) {
    this.__radian = Angler.degToRad(v)
    return this
  }

  get angle() {
    return Angler.radToDeg(this.__radian)
  }

  get radian() {
    return this.__radian
  }

}



export {
  Angler
}