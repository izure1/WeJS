import { Particle, ParticleOption } from '../../../Particle/Particle'
import { Random } from '../../../Utils/MathUtil'
import ObjectExtra from '../../../Utils/ObjectExtra'
import Matter from 'matter-js'


export default function add() {


    // TODO
    // 1. component.transform.z 값에 따라서 파티클 객체의 z좌표 역시 달라져야함
    // 2. 파티클이 particle.scale 값에 따라서 실제 물리객체의 크기가 달라져야함. 이건 (초기 크기값) * particle.progress 로 얻을 수 있음
    // 3. 파티클 이미지의 크기에 따라 물리객체의 초기 크기값이 정해져야함.
    // 4. 물리 객체에 콜라이더 설정을 해야함. 콜라이더는 WeJS.View의 tag 컴포넌트를 이용하도록 함. 파티클 객체는 tag 컴포넌트의 값을 상속받음.

    const { x, y, z } = this.body.component.transform
    const { speed, frictionAir } = this.body.component.particle

    const option = new ParticleOption
    const setting = ObjectExtra.overwrite(option, this.body.component.particle)
    const particle = ObjectExtra.overwrite(new Particle, setting)

    const id = Random.shortid()
    const forceX = Random.plusMinus() * Random.between(0, speed)
    const forceY = Random.plusMinus() * Random.between(0, speed)

    const object = Matter.Bodies.rectangle(x, -y, 10, 10)
    const info = { id, particle, object }
    

    // 파티클 물리 객체에 이벤트를 추가하고 월드에 적용합니다.
    // 이후 힘을 가합니다.
    Matter.Events.on(this.scene.physics.runner, 'afterUpdate', () => particle.update(16))
    Matter.World.add(this.scene.physics.world, object)
    Matter.Body.applyForce(
        object,
        Matter.Vector.create(x, y),
        Matter.Vector.create(forceX, forceY),
    )


    // 객체 설정 (크기, 마찰력 등)
    object.frictionAir = frictionAir

    // particle.duration 기간이 지나면 파티클을 월드에서 삭제합니다.
    particle.on('particleLifeEnd', () => { 
        Matter.World.remove(this.scene.physics.world, object)
        this.particles.delete(info)
    })

    this.particles.add(info)

}