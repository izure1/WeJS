export default async function setVideoProperty () {

  await this.video

  const {
    playbackRate,
    volume,
  } = this.body.component.video

  this.video.playbackRate = playbackRate
  this.video.volume = volume

}