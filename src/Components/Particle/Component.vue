<template>
    <div></div>
</template>

<script>
import Component from '../../View/Component/Component'
import Emitter from '../../Particle/Emitter'

import modify from './Methods/modify'


export class Reservation extends Component {

    name = 'particle'
    start = 1
    end = 0
    duration = 1000
    interval = 200
    speed = 0.05
    frictionAir = 0.3
    quantity = 1

    constructor(...args) {
        super(...args)
    }
}

export default {
    props: ['scene', 'body'],
    data: () => ({ emitter: new Emitter }),
    methods: { modify },
    watch: {
        'body.component.particle': {
            deep: true,
            handler() { this.modify() }
        }
    },

    created() {
        this.scene.particle.emitters.add(this.emitter)
        // this.emitter.particles.push(1, 2, 3)
        // console.log(this)
    },
    beforeDestroy() {
        //this.scene.particle.emitters.delete(this.emitter)
    }
}
</script>