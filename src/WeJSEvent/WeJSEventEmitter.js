import Definer from '../Utils/Definer'
import WeJSEventPlan from './WeJSEventPlan'
import WeJSEvent from './WeJSEvent'


class EventEmitter {

  static registHandler(map, e, handler, once) {

    if (!map.has(e)) {
      map.set(e, new Set)
    }

    const plan = new WeJSEventPlan
    plan.once = once
    plan.handler = handler

    map.get(e).add(plan)

  }

  static unregistHandler(map, e, handler) {

    if (!map.has(e)) return

    const plans = map.get(e)
    if (!handler) plans.clear()
    else {
      for (const plan of plans) {
        if (plan.handler !== handler) continue
        plans.delete(plan)
      }
    }

  }

  static runEventHandler(map, target, e, detail, ...params) {

    if (!map.has(e)) return
    for (const plan of map.get(e)) {
      const event = new WeJSEvent
      event.type = e
      event.target = target
      event.detail = detail
      plan.handler(event, ...params)
      if (plan.once) map.get(e).delete(plan)
    }

  }

  constructor() {

    Definer
      .create('__event', new Map)
      .seal(true).hidden(true).final(true)
      .to(this)

  }

  /**
   * 
   * @param {String} e  이벤트 타입
   * @param {Function} handler  이벤트를 처리할 핸들러 함수
   */
  on(e, handler) {
    e.split(' ').forEach(e => EventEmitter.registHandler(this.__event, e, handler, false))
  }

  /**
   * 
   * @param {String} e  이벤트 타입
   * @param {Function} handler  이벤트를 처리할 핸들러 함수
   */
  once(e, handler) {
    e.split(' ').forEach(e => EventEmitter.registHandler(this.__event, e, handler, true))
  }

  /**
   * 
   * @param {String} e  이벤트 타입
   * @param {Function} handler  이벤트를 처리하는 핸들러 함수
   */
  off(e, handler) {
    e.split(' ').forEach(e => EventEmitter.unregistHandler(this.__event, e, handler))
  }

  /**
   * 
   * @param {String} e  이벤트 타입
   * @param {Object} detail  이벤트의 상세 정보
   */
  emit(e, detail = null, ...params) {
    EventEmitter.runEventHandler(this.__event, this, e, detail, ...params)
  }

}


export default EventEmitter