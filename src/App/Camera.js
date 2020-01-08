class Camera {

  constructor() {
    this._pos = {
      x: 0,
      y: 0,
      z: 0,
    }
  }

  get pos() {
    return this._pos
  }

  set pos(_pos) {
    const {
      x,
      y,
      z,
    } = _pos
    this._pos.x = x
    this._pos.y = y
    this._pos.z = z
  }

}


export default Camera