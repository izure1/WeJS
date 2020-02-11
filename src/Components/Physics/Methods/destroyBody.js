import Matter from 'matter-js'


export default function destroyBody() {

    Matter.World.remove(this.scene.physics.world, this.object)
    this.object = null
    this.setObject = null

}