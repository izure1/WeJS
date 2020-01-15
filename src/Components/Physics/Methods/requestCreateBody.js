export default function requestCreateBody() {

  // 크기에 오류가 있을 시 바디를 만들지 않습니다.
  if (this.bodySize.filter(t => isNaN(t)).length) return

  if (!this.object) {
    const body = this.createBody()
    this.object = this.scene.physicsWorld.CreateBody(body)
  }
  const fixture = this.createFixture()

  this.object.CreateFixture(fixture)
  this.object.SetSleepingAllowed(false)


  const position = this.object.GetPosition()
  const transform = this.object.GetTransform()

}