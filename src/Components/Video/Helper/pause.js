import Component from '../../../View/Component/Component'


export default async function pause() {

    await Component.waitAttached(this)
    const video = await this.vue.video
    return video.pause()
  
}