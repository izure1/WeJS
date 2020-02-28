import Component from '../../../View/Component/Component'


export default async function playLazy(time = 0) {

    // 오디오가 로드되는 것을 기다립니다.
    await Component.waitAttached(this)
    const audio = await this.vue.audio
    if (!audio.playing()) this.play(time)

}