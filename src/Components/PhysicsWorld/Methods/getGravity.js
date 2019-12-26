export default function () {

  const b = this.box2d
  const {
    gravityX,
    gravityY,
  } = this.body.component.physicsWorld

  return new b.b2Vec2(gravityX, gravityY)

}