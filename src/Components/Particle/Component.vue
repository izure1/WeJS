<template>
    <div></div>
</template>

<script>
import Component from '../../View/Component/Component'
import Arrayset from '../../Utils/Arrayset'
import { ParticleOption } from '../../Particle/Particle'

import generate from './Methods/generate'
import stop from './Methods/stop'


export class Reservation extends Component {

    name = 'particle'
    quantity = 1

    constructor(...args) {
        super(...args)
        Object.assign(this, new ParticleOption)
    }
}

export default {
    props: ['scene', 'body'],
    data: () => ({
        particles: new Arrayset,
        intervalId: null,
    }),
    methods: {
        generate,
        stop,
    },
    created() {
        this.scene.particle.emitters.add(this.particles)
        this.generate()
    },
    beforeDestroy() {
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