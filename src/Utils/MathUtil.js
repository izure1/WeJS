import shortid from 'shortid'


class Angle {

  static radianToDegree(v) {
    return v * (180 / Math.PI)
  }

  static degreeToRadian(v) {
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
    this.__radian = Angle.degreeToRadian(v)
    return this
  }

  get angle() {
    return Angle.radianToDegree(this.__radian)
  }

  get radian() {
    return this.__radian
  }

}

class Random {

    static between(a = 0, b = 1) {
        return Math.random() * (b - a) + a
    }

    static shortid() {
        return shortid.generate()
    }

    static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }

}



export {
  Angle,
  Random,
}