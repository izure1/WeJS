import Matter from 'matter-js'

function p(x, y) {
  return {
    x,
    y
  }
}

export default async function requestCreateBody() {

  // 크기에 오류가 있을 시 바디를 만들지 않습니다.
  if (this.bodySize.filter(t => isNaN(t)).length) return
  // 물리객체가 생성되어 있다면 생성하지 않습니다.
  // 대신 크기 조절만 합니다.
  if (this.object) {
    const width = this.bodySize[0] / 2
    const height = this.bodySize[1] / 2
    const vertices = Matter.Vertices.create([p(-width, -height), p(width, -height), p(width, height), p(-width, height)], this.object)
    Matter.Body.setVertices(this.object, vertices)
    return
  }


  const { x, y } = this.body.component.transform
  const isStatic = this.body.component.physics.static

  this.object = Matter.Bodies.rectangle(x, -y, this.bodySize[0], this.bodySize[1], { isStatic })
  this.inertia = this.object.inertia

  Matter.World.add(this.scene.physicsWorld, this.object)
  
  await this.setFriction()
  await this.setRestitution()
  await this.setFixedRotation()

  this.setObjectReady()
  
}