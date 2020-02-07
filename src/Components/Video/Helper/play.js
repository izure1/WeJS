export default async function play(time = 0) {

  // 비디오가 준비될 때 까지 대기
  //await this.waitLoading()
  const video = await this.vue.video

  video.currentTime = time / 1000
  video.play()

}