import { Random } from './MathUtil'


class Tick {

  static last = null
  static list = new Map

  /**
   * 
   * @param {Function} callback  업데이트 될 때 마다 실행될 콜백함수를 등록합니다. requestAnimationFrame과 달리 1회용이 아니라, 저장되어 지속적으로 실행됩니다.
   * @param {Number} interval  callback 함수 호출 간격을 설정합니다. 지정하지 않는다면 매 프레임마다 호출될 것입니다.
   * @returns {String}  콜백함수의 ID값을 반환합니다. 이후에 Tick.cancelRequest 함수의 인수로 ID값을 넘겨 제거할 수 있습니다.
   */
  static request(callback, interval = 0) {
    const id = Random.shortid()
    const step = interval
    Tick.list.set(id, { callback, interval, step })
    return id
  }

  /**
   * 
   * @param {String} id  삭제할 콜백함수의 ID값입니다.
   */
  static cancelRequest(id) {
    Tick.list.delete(id)
  }

  static update() {
    window.requestAnimationFrame(now => {
        const interval = now - Tick.last
        if (!Tick.last) Tick.last = now
        for (const request of Tick.list.values()) {
            if ((request.step -= interval) > 0) continue
            request.step = request.interval
            request.callback(now, interval)
        }
        Tick.last = now
        Tick.update()
    })
  }

}

Tick.update()


export default Tick