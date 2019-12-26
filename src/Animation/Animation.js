import getEase from '../Utils/ease'


class Animation {

  constructor(raw = {
    start: 0,
    end: 0,
    timeStart: 0,
    last: 0,
    duration: 0,
    ease: 'linear'
  }) {

    const {
      start,
      end,
      timeStart,
      duration,
      ease,
    } = raw

    this.start = start
    this.end = end
    this.timeStart = timeStart
    this.duration = duration
    this.ease = ease

  }

  init() {
    this.timeStart = performance.now()
    return this
  }

  get step() {
    let interval = performance.now() - this.timeStart
    return getEase(this.ease, interval, this.start, this.end - this.start, this.duration)
  }

}


export default Animation