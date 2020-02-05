export default function onCanPlayThrough(e) {

  // 비디오가 재생가능한 시점이 되면 canplayPromise를 resolve합니다.
  // 이렇게 resolve된 promise는 body.component.video.load 메서드 내부에서 비디오가 재생가능한지 확인하기 위하여 사용합니다.
  this.body.component.video._canplayResolve(this.element)

}