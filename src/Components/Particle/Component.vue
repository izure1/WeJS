<template>
    <div></div>
</template>

<script>
import Component from '../../View/Component/Component'
import Arrayset from '../../Utils/Arrayset'
import { EmitterOption, ParticleOption } from '../../Particle/Particle'

import add from './Methods/add'
import generate from './Methods/generate'
import stop from './Methods/stop'


export class Reservation extends Component {

    name = 'particle'

    constructor(...args) {
        super(...args)
        Object.assign(this, new ParticleOption, new EmitterOption)
    }
}

export default {
    props: ['scene', 'body'],
    data: () => ({
        particles: new Arrayset,
        updateIntervalId: null,
    }),
    methods: {
        add,
        generate,
        stop,
    },
    created() {
        this.scene.particle.emitters.add(this.particles)
        this.generate()
    },
    beforeDestroy() {
        this.particles.clear()
        this.scene.particle.emitters.delete(this.particles)
        this.stop()
    },
    watch: {
        'body.component.particle': {
            deep: true,
            handler() {
                this.stop()
                this.generate()
            }
        }
    }
}
</script>