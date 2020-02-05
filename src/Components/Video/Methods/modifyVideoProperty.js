export default function setVideoProperty () {

  if (!this.element) return

  const {
    playbackRate,
    volume,
  } = this.body.component.video

  this.element.playbackRate = playbackRate
  this.element.volume = volume

}