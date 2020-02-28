<template>
    <div class="particle-renderer">
        <div v-for="(emitter, i) in emitters" :key="`emitter_${i}`">
            <div v-for="info in emitter" :key="`particle_${info.id}`">
                <div :style="{
                    transform: `
                        translate3d(
                            ${info.object.position.x}px,
                            ${info.object.position.y}px,
                            ${0}px
                        )
                        scale(${info.particle.scale})`,
                    position: 'absolute',
                }">★</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['emitters']
}
</script>

<style lang="scss" scoped>
.particle-renderer {
    width: 0;
    height: 0;
}
</style>