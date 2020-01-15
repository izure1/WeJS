import shortid from 'shortid'


class AnimationFrame {

  static lastUpdate = null
  static callback = new Map

  /**
   * 
   * @param {Function} callback  매 프레임이 업데이트 될 때 마다 실행될 콜백함수를 등록합니다. requestAnimationFrame과 달리 1회용이 아니라, 저장되어 지속적으로 실행됩니다.
   * @returns {String}  콜백함수의 ID값을 반환합니다. 이후에 AnimationFrame.cancelRequest 함수의 인수로 ID값을 넘겨 제거할 수 있습니다.
   */
  static request(callback) {
    const id = shortid.generate()
    AnimationFrame.callback.set(id, callback)
    return id
  }

  /**
   * 
   * @param {String} id  삭제할 콜백함수의 ID값입니다.
   */
  static cancelRequest(id) {
    AnimationFrame.callback.delete(id)
  }

  static update() {

    window.requestAnimationFrame(step => {
      if (!Animation.lastUpdate) AnimationFrame.lastUpdate = step
      for (const callback of AnimationFrame.callback.values()) {
        callback(step, step - AnimationFrame.lastUpdate)
      }
      AnimationFrame.lastUpdate = step
      AnimationFrame.update()
    })

  }

}

AnimationFrame.update()


export default AnimationFrame