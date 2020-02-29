<template>
    <div class="particle-renderer">
        <div v-for="(emitter, i) in emitters" :key="`emitter_${i}`">
            <div v-for="info in emitter" :key="`particle_${info.id}`">
                <img :src="loader.getUri(info.particle.src)" class="particle-item" :style="{
                    mixBlendMode: info.particle.blend,
                    position: 'absolute',
                    transform: `
                        translate3d(
                            ${centerPointX(info)}px,
                            ${centerPointY(info)}px,
                            ${centerPointZ(info)}px)
                        scale(${info.particle.scale})`
                }">
            </div>
        </div>
    </div>
</template>

<script>
import AssetLoader from '../Asset/AssetLoader/AssetLoader'


export default {
    props: ['emitters'],
    data: () => ({ loader: new AssetLoader }),
    methods: {
        centerPointX(info) {
            return info.object.position.x - (info.particle.width / 2)
        },
        centerPointY(info) {
            return info.object.position.y - (info.particle.height / 2)
        },
        centerPointZ(info) {
            return info.particle.z
        } 
    }
}
</script>

<style lang="scss" scoped>
.particle-renderer {
    width: 0;
    height: 0;
}
</style>