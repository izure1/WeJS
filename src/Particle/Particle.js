import EventEmitter from '../WeJSEvent/WeJSEventEmitter'


class ParticleOption {
    src = null
    start = 1
    end = 0
    duration = 1000
    frictionAir = 0.3
}

class EmitterOption {
    speed = 0.01
    interval = 100
    quantity = 1
}

class Particle extends EventEmitter {

    step = 0

    constructor(...args) {
        super(...args)
        Object.assign(this, new ParticleOption)
    } 

    get progress() {
        return this.step / this.duration
    }

    get scale() {
        const { start, end, progress } = this
        return start - (progress * (start - end))
    }

    update(deltaTime) {
        this.step += deltaTime
        if (this.step > this.duration) {
            this.step = 0
            this.emit('particleLifeEnd')
        }
    }

}


export { Particle, ParticleOption, EmitterOption }