class Animation {

  constructor() {

    this.before = 0
    this.after = 0
    this.duration = 0
    this.progress = 0
    this.ease = 'linear'

  }

  update(interval) {
    this.progress += interval
  }

}