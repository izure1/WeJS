export default function onCanPlayThrough(e) {

  // 비디오가 재생가능한 시점이 되면 비디오 promise를 resolve합니다.
  // 이렇게 resolve된 promise는 body.component.rendererVideo.load 메서드 내부에서 비디오가 재생가능한지 확인하기 위하여 사용합니다.
  this.canplayResolve(this.element)

}