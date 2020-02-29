import Matter from 'matter-js'
import MatterExtra from '../../../Utils/Matter-extra'

import { Particle, ParticleOption } from '../../../Particle/Particle'
import { ImageSize } from '../../../Utils/SizeCalculator'
import { Random } from '../../../Utils/MathUtil'
import AssetLoader from '../../../Asset/AssetLoader/AssetLoader'
import ObjectExtra from '../../../Utils/ObjectExtra'


export default async function add() {


    // TODO
    // 1. component.transform.z 값에 따라서 파티클 객체의 z좌표 역시 달라져야함
    // 4. 물리 객체에 콜라이더 설정을 해야함. 콜라이더는 WeJS.View의 tag 컴포넌트를 이용하도록 함. 파티클 객체는 tag 컴포넌트의 값을 상속받음.

    const { x, y, z } = this.body.component.transform
    const { src, speed, frictionAir } = this.body.component.particle
    const { width, height } = await ImageSize.calc(AssetLoader.getUri(src))

    const option = new ParticleOption
    const setting = ObjectExtra.overwrite(option, this.body.component.particle)
    const particle = ObjectExtra.overwrite(new Particle(width, height, z), setting)

    const id = Random.shortid()
    const forceX = Random.plusMinus() * Random.between(0, speed)
    const forceY = Random.plusMinus() * Random.between(0, speed)

    const object = Matter.Bodies.rectangle(x, -y, width, height)
    const info = { id, particle, object }

    // 매 프레임 파티클을 업데이트합니다.
    const update = () => {
        particle.update(16)
        MatterExtra.Body.changeSize((particle.scale * width), (particle.scale * height), object)
    }
    

    // 파티클 물리 객체에 이벤트를 추가하고 월드에 적용합니다.
    // 이후 힘을 가합니다.
    Matter.Events.on(this.scene.physics.runner, 'afterUpdate', update)
    Matter.World.add(this.scene.physics.world, object)
    Matter.Body.applyForce(
        object,
        Matter.Vector.create(x, y),
        Matter.Vector.create(forceX, forceY),
    )


    // 객체 설정 (크기, 마찰력 등)
    Matter.Body.setInertia(object, Infinity)

    object.frictionAir = frictionAir
    object.collisionFilter.group = -1

    // particle.duration 기간이 지나면 파티클을 월드에서 삭제합니다.
    particle.on('particleLifeEnd', () => { 
        Matter.Events.off(this.scene.physics.runner, 'afterUpdate', update)
        Matter.World.remove(this.scene.physics.world, object)
        this.particles.delete(info)
    })

    this.particles.add(info)

}