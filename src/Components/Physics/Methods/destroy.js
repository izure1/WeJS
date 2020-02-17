import Matter from 'matter-js'


export default function destroy() {
    Matter.World.remove(this.scene.physics.world, this.object, true)
    this.object = null
}