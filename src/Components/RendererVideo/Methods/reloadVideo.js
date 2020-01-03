export default async function reloadVideo() {

  const self = this

  // template가 마운트되기까지 대기하기
  await this.mountPromise

  // Document에 마운트 되었다면
  this.element = this.$el.querySelector('video')


  // 컴포넌트에 element를 등록합니다.
  // 이 내용은 추후 세이브할 때 컴포넌트 정보와 함께 저장되지 않도록 enumerable하게 생성되지 않습니다.

  this.body.component.rendererVideo.element = this.element

}