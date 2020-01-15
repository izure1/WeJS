class Definer {

  /**
   * 
   * @param {String} name  변수명입니다
   * @param {*} value  변수값입니다
   */
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

  /**
   * 
   * @param {Boolean} v 
   * @description  이 변수를 삭제할 수 없도록 만듭니다.
   */
  seal(v) {
    this.configurable = !v
    return this
  }

  /**
   * 
   * @param {Boolean} v 
   * @description  이 변수를 열거할 수 없도록 숨깁니다.
   */
  hidden(v) {
    this.enumerable = !v
    return this
  }

  /**
   * 
   * @param {Boolean} v
   * @description  이 변수를 수정할 수 없도록 상수화합니다. 
   */
  final(v) {
    this.writable = !v
    return this
  }

  /**
   * 
   * @param {*} obj 
   * @description  이 변수를 부착합니다.
   */
  to(obj) {
    Object.defineProperty(obj, this.name, this)
  }

}


export default Definer