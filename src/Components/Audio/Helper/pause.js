export default async function pause() {

  const audio = await this.vue.audio
  audio.pause()

}