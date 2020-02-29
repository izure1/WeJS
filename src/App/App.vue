<template>
    <section
        class="wejs-app"
        :style="{
            width: `${app.width}px`,
            height: `${app.height}px`,
            transform: `scale(${appScale})`
        }">
        <we-body
            :app="app"
            :scene="app"
            :body="app"
            :requiredLevel="app.levelDesign.getRequired(app.level)"
            :style="{ perspective: `${app.perspective}px` }" />
    </section>
</template>

<script>
import screenfull from 'screenfull'
import WeBody from '../View/View.vue'
import onScreenChange from './Methods/onScreenChange'


export default {

    components: { WeBody },
    props: ['app'],
    data: () => ({
        resizeObserver: null,
        appScale: 1,
    }),
    methods: { onScreenChange },
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

<style lang="scss" scoped>
.wejs-app {
    position: relative;
    overflow: hidden;
    user-select: none;
}
</style>