export default async function onChangeVideoSrc() {

  // 비디오가 변경되었으므로 새로운 프로미스를 생성합니다.
  this.body.component.rendererVideo._setCanplayPromise()
  // 비디오를 불러옵니다.
  await this.reloadVideo()

}