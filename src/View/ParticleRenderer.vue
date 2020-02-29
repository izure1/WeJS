<template>
    <div class="particle-renderer">
        <div v-for="(emitter, i) in emitters" :key="`emitter_${i}`">
            <div v-for="info in emitter" :key="`particle_${info.id}`">
                <div :style="{
                    position: 'absolute',
                    transform: `
                        translate3d(
                            ${info.object.position.x}px,
                            ${info.object.position.y}px,
                            0px)
                        scale(${info.particle.scale})`
                }">
                    <img :src="loader.getUri(info.particle.src)" class="particle-item" :style="{ mixBlendMode: info.particle.blend }">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AssetLoader from '../Asset/AssetLoader/AssetLoader'


export default {
    props: ['body', 'emitters'],
    data: () => ({ loader: new AssetLoader })
}
</script>

<style lang="scss" scoped>
.particle-renderer {
    width: 0;
    height: 0;
    transform-style: preserve-3d;
}
</style>