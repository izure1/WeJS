export default function observeAudioPosition() {

  this.intervalIndex = setInterval(() => {

    const el = this.$el
    const app = this.app

    if (!this.audio) return
    if (!app.appElement) return

    const appStyle = getComputedStyle(app.appElement)
    const appRect = app.appElement.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    const relX = elRect.x - appRect.x
    const relY = elRect.y - appRect.y
    const centerX = parseFloat(appStyle.width) / 2
    const centerY = parseFloat(appStyle.height) / 2


    const x = relX - centerX
    const y = centerY - relY

    this.audio.pannerAttr({
      coneInnerAngle: 360,
      coneOuterAngle: 360,
      coneOuterGain: 0,
      distanceModel: 'inverse',
      maxDistance: 10000,
      rolloffFactor: 1,
      refDistance: 100,
      panningModel: 'HRTF'
    })
    this.audio.orientation(0, 0, 1)
    this.audio.pos(x, y, 0)

  }, this.body.component.audio.recaching)

}