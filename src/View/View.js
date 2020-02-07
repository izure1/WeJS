import Definer from '../Utils/Definer'
import WeJSEventEmitter from '../WeJSEvent/WeJSEventEmitter'

import Arrayset from '../Utils/Arrayset'
import ComponentList from './ComponentList/ComponentList'
import ComponentFactory from './ComponentFactory/ComponentFactory'
import LevelDesign from './LevelDesign/LevelDesign'

import RESERVATION from '../Components/RESERVATION'


class View extends WeJSEventEmitter {

  constructor(raw = {
    id: null,
    level: LevelDesign.PERSISTENT_LEVEL,
    levelDesign: new LevelDesign,
    component: new ComponentList
  }) {

    super()

    const {
      id,
      level,
      levelDesign,
      component,
    } = raw

    this.id = id
    this.level = level
    this.levelDesign = levelDesign
    this.tags = new Arrayset
    this.component = new ComponentList(component)

    const factory = new ComponentFactory
    this.component.add(factory.create(RESERVATION.CAMERA))
    this.component.add(factory.create(RESERVATION.TRANSFORM))
    this.component.add(factory.create(RESERVATION.FILTER))

    /*
     *
     *  이벤트를 담을 공간을 추가합니다.
     *  이벤트 종류마다 새로운 Set 객체를 만들어 보관합니다.
     * 
     *  Ex)
     *  _event : new Map {
     *    type : new Set [ WeJSEventPlan, WeJSEventPlan, ... ]
     *  }
     * 
     */
    Definer
      .create('_event', new Map)
      .seal(true).hidden(true).final(true)
      .to(this)

    /**
     * 
     *  객체의 라이프사이클을 담을 공간을 추가합니다.
     *  여기에서 선언된 라이프사이클은, vue 라이프사이클과 함께 동작합니다.
     * 
     */
    Definer
      .create('_lifecycle', new Map)
      .seal(true).hidden(true).final(true)
      .to(this)

    this._lifecycle.startFns = []
    this._lifecycle.updateFns = []
    this._lifecycle.destroyFns = []

  }

  get lifecycle() {
    return {
      start: this._lifecycle.startFns,
      update: this._lifecycle.updateFns,
      destroy: this._lifecycle.destroyFns,
    }
  }

  start(fn) {
    this._lifecycle.startFns.push(fn.bind(this))
    return this
  }
  update(fn) {
    this._lifecycle.updateFns.push(fn.bind(this))
    return this
  }
  destroy(fn) {
    this._lifecycle.destroyFns.push(fn.bind(this))
    return this
  }

}


export default View