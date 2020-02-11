export default async function pause() {

  await this.vueReady
  const audio = await this.vue.audio
  audio.pause()

}