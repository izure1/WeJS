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

  static RESERVATION = RESERVATION_MAP
  static COMPONENT = COMPONENT_MAP

  constructor(reservation) {
    this.cache = reservation
  }

  build() {

    const componentName = ComponentBuilder.convertToCamelCase(this.cache.name)
    const ComponentConstructor = ComponentBuilder.RESERVATION.get(this.cache.name)
    
    // cache로 넘겨받은 데이터와, 신규 클래스의 데이터를 병합한 ref 변수를 생성합니다
    // ref변수로부터 Component를 생성합니다.
    const ref = new ComponentConstructor(this.cache)
    ref.name = componentName
    return ref

  }

}


export default ComponentBuilder