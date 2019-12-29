export default async function play(time) {
  await this.load()
  console.log(1)
  await this.element.play()
  this.element.currentTime = time
}