<template>
    <div></div>
</template>

<script>
import Component from '../../View/Component/Component'
import Arrayset from '../../Utils/Arrayset'
import ParticleOption from '../../Particle/ParticleOption'
import EmitterOption from '../../Particle/EmitterOption'

import add from './Methods/add'
import generate from './Methods/generate'
import stop from './Methods/stop'
import setCollider from './Methods/setCollider'
import updateCollision from './Methods/updateCollision'


export class Reservation extends Component {

    name = 'particle'
    colliders = new Arrayset

    constructor(...params) {
        super(...params)
        Object.assign(this, new ParticleOption, new EmitterOption)
    }
}

export default {
    props: ['scene', 'body'],
    data: () => ({
        particles: new Arrayset,
        updateIntervalId: null,
        collision: 0,
    }),
    methods: {
        add,
        generate,
        stop,
        setCollider,
        updateCollision,
    },
    created() {
        this.scene.particle.emitters.add(this.particles)
        this.scene.physics.collision.on('collision-update', this.setCollider)
        this.generate()
        this.setCollider()
    },
    beforeDestroy() {
        this.particles.clear()
        this.scene.physics.collision.off('collision-update', this.setCollider)
        this.scene.particle.emitters.delete(this.particles)
        this.stop()
    },
    watch: {
        'body.component.particle': {
            deep: true,
            handler() {
                this.stop()
                this.generate()
                this.setCollider()
            }
        },
        'collision': {
            handler() {
                this.updateCollision()
            }
        }
    }
}
</script>