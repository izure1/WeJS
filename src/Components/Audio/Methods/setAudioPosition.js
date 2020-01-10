export default function setAudioPosition() {

  if (!this.audio) return

  this.audio.pos(this.x, this.y, this.z)
  console.log(this.x, this.y)
  // this.audio.pannerAttr({
  //   panningModel: 'HRTF',
  //   refDistance: 0.8,
  //   rolloffFactor: 2.5,
  //   distanceModel: 'exponential'
  // })

}