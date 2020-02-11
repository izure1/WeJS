<template>
    <section class="we-viewport" :style="{ 
        width: `${app.width}px`,
        height: `${app.height}px`,
        backgroundColor: app.backgroundColor,
        borderColor: app.borderColor,
        borderWidth: `${app.borderWidth}px`,
        perspective: `${app.perspective}px`,
    }">
        <div class="we-screen" :style="{
            width: `${app.width}px`,
            height: `${app.height}px`,
            transform: `scale(${appScale})`,
            margin: `${-app.height / 2}px 0 0 ${-app.width / 2}px`,
        }">
        <we-body v-for="(scene, index) in scenes" :key="index"
            :app="app"
            :scene="scene"
            :body="scene"
            :requiredLevel="scene.levelDesign.getRequired(scene.level)"
            :style="{ zIndex: index }" />
        </div>
    </section>
</template>

<script>
import screenfull from 'screenfull'
import WeBody from '../View/View.vue'
import LevelDesign from '../View/LevelDesign/LevelDesign'
import onScreenChange from './Methods/onScreenChange'

export default {

    components: { WeBody },
    props: ['scenes', 'app'],
    data: () => ({
        resizeObserver: null,
        appScale: 1,
    }),
    methods: {
        onScreenChange
    },
    created() {
        this.resizeObserver = new ResizeObserver(this.onScreenChange)
    },
    mounted() {
        this.resizeObserver.observe(this.$el)
    },
    beforeDestroy() {
        this.resizeObserver.disconnect()
        this.resizeObserver = null
    }

}
</script>

<style scoped>
.we-viewport {
    position: relative;
    overflow: hidden;
    user-select: none;
    border-style: solid;
}

.we-screen {
    transform-style: preserve-3d;
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>