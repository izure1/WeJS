import EventEmitter from '../WeJSEvent/WeJSEventEmitter'


class ParticleOption {
    src = null
    start = 1
    end = 0
    duration = 1000
    frictionAir = 0.05
    blend = 'normal'
    z = 0
}

class EmitterOption {
    speed = 0.01
    interval = 100
    quantity = 1
}

class Particle extends EventEmitter {

    __width = 0
    __height = 0
    step = 0

    constructor(width, height, z) {
        super()
        this.__width = width
        this.__height = height
        this.z = z
        Object.assign(this, new ParticleOption)
    } 

    get progress() {
        return this.step / this.duration
    }

    get scale() {
        const { start, end, progress } = this
        return start - (progress * (start - end))
    }

    get width() { return this.__width * this.scale }
    get height() { return this.__height * this.scale }
_
    update(deltaTime) {
        this.step += deltaTime
        if (this.step > this.duration) {
            this.step = 0
            this.emit('particleLifeEnd')
        }
    }

}


export { Particle, ParticleOption, EmitterOption }