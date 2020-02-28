import { Particle, ParticleOption } from '../../../Particle/Particle'
import { Random } from '../../../Utils/MathUtil'
import ObjectExtra from '../../../Utils/ObjectExtra'
import Matter from 'matter-js'


export default function add() {

    const option = new ParticleOption
    const setting = ObjectExtra.overwrite(option, this.body.component.particle)
    const particle = ObjectExtra.overwrite(new Particle, setting)

    const id = Random.shortid()

    const { x, y } = this.body.component.transform
    const { speed } = this.body.component.particle

    const forceX = Random.plusMinus() * Random.between(0, speed)
    const forceY = Random.plusMinus() * Random.between(0, speed)

    const object = Matter.Bodies.rectangle(x, y, 10, 10)
    const info = { id, particle, object }
    
    Matter.Events.on(this.scene.physics.runner, 'afterUpdate', () => particle.update(16))
    Matter.World.add(this.scene.physics.world, object)
    Matter.Body.applyForce(
        object,
        Matter.Vector.create(x, y),
        Matter.Vector.create(forceX, forceY),
    )

    particle.on('particleLifeEnd', () => { 
        Matter.World.remove(this.scene.physics.world, object)
        this.particles.delete(info)
    })

    this.particles.add(info)

}