export default function () {

  const b = this.box2d
  const gravity = this.getGravity()

  this.world = new b.b2World(gravity, false)

}