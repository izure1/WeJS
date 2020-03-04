import EventEmitter from '../WeJSEvent/WeJSEventEmitter'
import ParticleOption from './ParticleOption'


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
            this.emit('particle-life-end')
        }
    }

}


export default Particle