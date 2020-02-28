import Matter from 'matter-js'


export default function wakeAll() {

    for (const body of this.scene.physics.world.bodies)
        Matter.Sleeping.set(body, false)

}