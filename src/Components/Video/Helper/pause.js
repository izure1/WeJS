export default async function pause() {

    await this.vueReady
    const video = await this.vue.video
    return video.pause()
  
}