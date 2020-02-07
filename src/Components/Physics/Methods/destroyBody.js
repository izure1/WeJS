import Matter from 'matter-js'


export default async function destroyBody() {

  Matter.World.remove(this.scene.physicsWorld, this.object)
  this.object = null
  this.setObject = null

}