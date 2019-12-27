import screenfull from 'screenfull'


export default function onScreenChange(e) {

  if (!screenfull.isFullscreen) this.appScale = 1
  else {

    const appWidth = this.app.width
    const appHeight = this.app.height

    const screenWidth = screen.width
    const screenHeight = screen.height


    const scaleX = screenWidth / appWidth
    const scaleY = screenHeight / appHeight

    this.appScale = scaleX > scaleY ? scaleX : scaleY

  }

}