export default async function play(time) {
  await this.load()
  this._element.currentTime = time
  this._element.play()
}