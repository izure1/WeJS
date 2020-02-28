import Component from '../../../View/Component/Component'


export default async function pause() {

    await Component.waitAttached(this)
    const audio = await this.vue.audio
    audio.pause()

}