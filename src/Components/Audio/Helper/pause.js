export default async function pause() {

  await this.waitLoading()
  this.audio.pause()

}