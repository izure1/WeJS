class ParticleOption {

    start = 1
    end = 0
    duration = 1000
    interval = 100
    speed = 0.05
    frictionAir = 0.3

}

class Particle {
    
    x = 0
    y = 0
    step = 0

    constructor() {
        Object.assign(this, new ParticleOption)
    }

    get progress() {
        return 1 - (this.step / this.duration)
    }

    get scale() {
        const { start, end, progress } = this
        return start - (progress * (start - end))
    }

    update(deltaTime) {
        this.step -= deltaTime
        if (this.step < 0) this.step = 0
    }

}


export { Particle, ParticleOption }