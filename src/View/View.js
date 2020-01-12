import Definer from '../Utils/Definer'
import WeJSEventPlan from './WeJSEvent/WeJSEventPlan'
import WeJSEvent from './WeJSEvent/WeJSEvent'

import ComponentList from './ComponentList/ComponentList'
import ComponentFactory from './ComponentFactory/ComponentFactory'
import LevelDesign from './LevelDesign/LevelDesign'

import RESERVATION from '../Components/RESERVATION'


class View {

  constructor(raw = {
    id: null,
    level: LevelDesign.PERSISTENT_LEVEL,
    levelDesign: new LevelDesign,
    component: new ComponentList
  }) {

    const {
      id,
      level,
      levelDesign,
      component,
    } = raw

    this.id = id
    this.level = level
    this.levelDesign = levelDesign
    this.component = new ComponentList(component)

    const factory = new ComponentFactory
    this.component.add(factory.create(RESERVATION.CAMERA))
    this.component.add(factory.create(RESERVATION.TRANSFORM))
    this.component.add(factory.create(RESERVATION.FILTER))

    // 이벤트를 담을 공간을 추가합니다
    Definer
      .create('_events', new Map)
      .seal(true).hidden(true).final(true)
      .to(this)

  }

  _registHandler(e, handler, once) {

    if (!this._events.has(e)) {
      this._events.set(e, new Set)
    }

    const plan = new WeJSEventPlan
    plan.once = once
    plan.handler = handler.bind(this)

    this._events.get(e).add(plan)

  }

  on(e, handler) {
    this._registHandler(e, handler, false)
  }

  once(e, handler) {
    this._registHandler(e, handler, true)
  }

  emit(e, detail) {

    if (!this._events.has(e)) return
    for (const plan of this._events.get(e)) {
      const event = new WeJSEvent
      event.type = e
      event.target = this
      event.detail = detail
      plan.handler(event)
      if (plan.once) this._events.get(e).delete(plan)
    }

  }

}


export default View