<template>
    <div>
        <div
            v-for="(emitter, i) in emitters"
            :key="`emitter_${i}`"
        >
            1
            <div
                v-for="(particle, i) in emitter.particles"
                :key="`particle_${i}`"
            >2
                {{ particle.x }} , {{ particle.y }}
            </div>
        </div>
    </div>
</template>

<script>
import Matter from 'matter-js'


export default {
    props: ['emitters']
}
</script>