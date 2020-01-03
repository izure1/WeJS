export default async function onChangeAudioSrc() {

  // 오디오가 변경되었으므로 새로운 프로미스를 생성합니다.
  this.body.component.audio._setLoadedPromise()
  // 오디오를 불러옵니다.
  this.reloadAudio()

}