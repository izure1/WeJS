<template>
    <section
        class="wejs-app"
        tabindex="0"
        :style="{
            width: `${app.width}px`,
            height: `${app.height}px`,
            transform: `scale(${appScale})`
        }"
        
        @keydown="emit"
        @keypress="emit"
        @keyup="emit"
        @mousedown="emit"
        @mouseenter="emit"
        @mouseleave="emit"
        @mousemove="emit"
        @mouseout="emit"
        @mouseover="emit"
        @mouseup="emit"
        @mousewheel="emit"
        @click="emit"
        @contextmenu="emit"
        @dblclick="emit"
        @drag="emit"
        @dragend="emit"
        @dragenter="emit"
        @dragleave="emit"
        @dragover="emit"
        @dragstart="emit"
        @drop="emit"
        @focus="emit"

    >
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
import emit from './Methods/emit'


export default {

    components: { WeBody },
    props: ['app'],
    data: () => ({
        resizeObserver: null,
        appScale: 1,
    }),
    methods: {
        onScreenChange,
        emit,
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

<style lang="scss" scoped>
.wejs-app {
    position: relative;
    overflow: hidden;
    user-select: none;
    outline: none;
}
</style>