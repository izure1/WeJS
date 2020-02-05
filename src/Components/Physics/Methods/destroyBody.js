import Matter from 'matter-js'


export default async function destroyBody() {

  if (!this.object) return
  await this.objectReady

  Matter.World.remove(this.scene.physicsWorld, this.object)
  this.object = null

}