export default async function play(time) {
  await this.load()
  console.log(this, this.element)
  await this.element.play()
  this.element.currentTime = time
}