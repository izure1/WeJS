export default async function pause() {
  //await this.waitLoading()
  const video = await this.vue.video
  return video.pause()
}