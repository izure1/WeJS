import Component from '../Component/Component'
import {
  RESERVATION_MAP,
  COMPONENT_MAP,
} from '../../Components/RESERVATION'


/**
 * @description
 * 생성자 매개변수로 넘겨받은 정보를 기반으로 컴포넌트 객체를 얻을 수 있는 객체.
 * 넘겨받은 정보와 컴포넌트에 새롭게 추가된 정보가 있을 경우, 이를 병합하여 컴포넌트 객체를 반환해줍니다.
 */
class ComponentBuilder {

  static convertToCamelCase(raw) {
    return raw.replace(/\-(.?)/g, (matched, character) => character.toUpperCase())
  }

  static getNonEnumProps(obj) {
    const alls = Object.getOwnPropertyNames(obj)
    const enums = Object.keys(obj)
    return alls.filter(t => enums.indexOf(t) === -1)
  }

  static RESERVATION = RESERVATION_MAP
  static COMPONENT = COMPONENT_MAP

  constructor(reservation) {
    this.data = reservation
  }

  build() {

    let ref

    if (ComponentBuilder.RESERVATION.has(this.data.name)) ref = {
      ...ComponentBuilder.RESERVATION.get(this.data.name).call(null),
      ...this.data,
    }


    const nonEnums = ComponentBuilder.getNonEnumProps(this.data)
    nonEnums.forEach(property => ref[property] = this.data[property])

    ref.name = ComponentBuilder.convertToCamelCase(this.data.name)
    return new Component(ref)

  }

}


export default ComponentBuilder