class WaitReady {

  callbacks = new Set
  ready = false

  init() {
    this.ready = false
    this.callbacks = new Set
  }

  wait(callback) {

    if (this.ready) {
      callback()
      return
    }

    this.callbacks.add(callback)

  }

  done(init = false) {

    if (this.ready) return

    this.ready = true
    this.callbacks.forEach(callback => {
      callback()
      this.callbacks.delete(callback)
    })

    if (init) this.init()

  }

}


export default WaitReady