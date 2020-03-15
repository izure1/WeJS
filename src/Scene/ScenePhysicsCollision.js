import WeJSEventEmitter from '../WeJSEvent/WeJSEventEmitter'

import Arrayset from '../Utils/Arrayset'
import Pairs from '../Utils/Pairs'


class PhysicsCollision extends WeJSEventEmitter {
    
    static DEFAULT_COLLIDER = 'default'

    collisions = new Pairs
    colliders = new Arrayset

    constructor() {
        super()
        this.colliders.add(PhysicsCollision.DEFAULT_COLLIDER)
    }

    getCollisionFilter(collider) {
        const i = this.colliders.indexOf(collider)
        return i !== -1 ? Math.pow(2, i) : 0
    }
    
    addCollider(collider) {

        if (this.colliders.length > 32)
            throw 'Collider there are up to 32 available'

        this.colliders.add(collider)
        this.emit('add-collider')

        return this.getCollisionFilter(collider)

    }

    addCollision(...collider) {

        const colliders = [...collider]

        for (const t of colliders)
            this.addCollider(t)
            
        this.collisions.add(...collider)
        this.emit('add-collision')

    }

    deleteCollision(...collider) {

        const colliders = [...collider]

        for (const t of colliders)
            this.collisions.delete(t)

        this.emit('delete-collision')

    }

    between(...collider) {
        const colliders = [...collider]
        return colliders
            .map((collider) => this.addCollider(collider))
            .reduce((a, b) => (a | b), (colliders || []))
    }

}


export default PhysicsCollision