import Particle from '../../../Particle/Particle'


export default function modify() {

    const particles = this.emitter.particles
    const {
        start,
        end,
        duration,
        interval,
        speed,
        frictionAir,
        quantity,
    } = this.body.component.particle
    
    // 파티클 객체가 부족할 경우, 더 추가합니다
    for (let i = particles.length; i < quantity; i++)
        particles.add(new Particle)

    // 파티클 객체가 많을 경우, 제거합니다
    for (let i = particles.length; i > quantity; i--)
        particles.pop()

    // 모든 파티클 객체를 순회하며 정보를 업데이트합니다
    for (const particle of particles) {
        particle
    }

}