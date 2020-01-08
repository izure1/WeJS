export default function setAudioProperty () {

  if (!this.audio) return

  const {
    playbackRate,
    volume,
    loop,
    muted,
  } = this.body.component.audio

  this.audio.rate(playbackRate)
  this.audio.mute(muted)
  this.audio.loop(loop)
  this.audio.volume(volume)

}