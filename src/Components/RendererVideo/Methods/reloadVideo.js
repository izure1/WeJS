export default async function reloadVideo() {

  const self = this

  // template가 마운트되기까지 대기하기
  await this.mountPromise

  console.log('마운트되었음')

  // Document에 마운트 되었다면
  this.element = this.$el.querySelector('video')


  // 컴포넌트에 element를 등록합니다.
  // 이 내용은 추후 세이브할 때 컴포넌트 정보와 함께 저장되지 않도록 enumerable하게 생성되지 않습니다.

  Object.defineProperty(this.body.component.rendererVideo, 'element', {
    value: this.element,
  })

  // 비디오가 새롭게 로드되었으니, 비디오 재생이 가능한지 여부를 알려주는 promise를 새롭게 지정합니다.
  // 이 promise는 비디오가 canplaythrough 이벤트를 발생할 때 resolve됩니다.
  Object.defineProperty(this.body.component.rendererVideo, '_canplayPromise', {
    value: new Promise(resolve => {
      Object.defineProperty(self.body.component.rendererVideo, '_canplayResolve', {
        value: resolve
      })
    })
  })

}