export default async function setAudioProperty () {

  const audio = await this.audio

  const {
    playbackRate,
    volume,
    loop,
    muted,
  } = this.body.component.audio

  audio.rate(playbackRate)
  audio.mute(muted)
  audio.loop(loop)
  audio.volume(volume)

}