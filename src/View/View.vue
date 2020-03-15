<template>
    <div
        class="we-body"
        tabindex="0"
        v-if="isNeedFromScene(requiredLevel, body.level)" 
        :id="body.id" 
        :class="{
            'scene2d': scene.type === SCENE_2D,
            'scene3d': scene.type === SCENE_3D,
        }"
        :we-body-tag="body.tags.join(' ')"
        :we-body-size="sizeMax"
        :style="{
            backgroundColor: body.component.filter.backgroundColor,
            transition: `
                all
                ${body.component.transform.duration}ms
                ${body.component.transform.ease}
                ${body.component.transform.delay}ms`,
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

        <!-- 
        현재 객체를 필터 처리 합니다.
        필터는 현재 객체의 컴포넌트 Element만 적용됩니다.
        filter 속성이 주어질 경우, 자식 Element는 transform-origin: preserve-3d 을 사용할 수 없기 때문입니다.
        -->
        <div
            class="we-components"
            :style="{
                cursor: body.component.filter.cursor,
                transition: `
                    all
                    ${body.component.filter.duration}ms
                    ${body.component.filter.ease}
                    ${body.component.filter.delay}ms`,
                filter: `
                    blur(${body.component.filter.blur}px)
                    brightness(${body.component.filter.brightness})
                    contrast(${body.component.filter.contrast})
                    grayscale(${body.component.filter.grayscale})
                    invert(${body.component.filter.invert})
                    opacity(${body.component.filter.opacity})
                    saturate(${body.component.filter.saturate})
                    sepia(${body.component.filter.sepia})`,
            }"
        >

            <!-- 
                화면에 시각적으로 보이는 컴포넌트를 이곳에 넣습니다.
                이 컴포넌트들은 position: static이므로, 위에서 아래로 순차대로 쌓입니다.
            -->
            <div class="we-components-visible">
                <component-text v-if="     hasComponent('text')" :app="app" :scene="scene" :body="body" />
                <component-html v-if="     hasComponent('html')" :app="app" :scene="scene" :body="body" />
                <component-image v-if="    hasComponent('image')" :app="app" :scene="scene" :body="body" />
                <component-video v-if="    hasComponent('video')" :app="app" :scene="scene" :body="body" />
                <component-rect v-if="     hasComponent('rect')" :app="app" :scene="scene" :body="body" />
            </div>

            <!-- 
                화면에 시각적으로 보이지 않는 컴포넌트를 이곳에 넣습니다.
            -->
            <div class="we-components-hidden">
                <component-physics v-if="  hasComponent('physics')" :app="app" :scene="scene" :body="body" />
                <component-audio v-if="    hasComponent('audio')" :app="app" :scene="scene" :body="body" />
                <component-particle v-if=" hasComponent('particle')" :app="app" :scene="scene" :body="body" />
            </div>

        </div>

        <!-- Children 컴포넌트에 있는 하위 자식 객체를 추가합니다. -->
        <div
            class="we-camera"
            v-if="hasComponent('children')"
            :class="{
                'scene2d': scene.type === SCENE_2D,
                'scene3d': scene.type === SCENE_3D,
            }"
            :style="{ 
                transform: `translate3d(
                    ${-body.component.camera.x}px,
                    ${body.component.camera.y}px,
                    ${body.component.camera.z}px) 
                    rotateX(${-body.component.camera.rotateX}deg)
                    rotateY(${body.component.camera.rotateY}deg)
                    rotateZ(${-body.component.camera.rotateZ}deg)`
            }"
        >
            <!-- 파티클을 보여줍니다. 이 기능은 물리효과를 필요로 하기 때문에, 객체의 타입이 씬일 경우에만 동작합니다. -->
            <particle-renderer
                v-if="isScene"
                :emitters="body.particle.emitters"
                :app="app"
                :scene="scene"
                :body="body"
            />
            <!-- 자식 객체를 보여줍니다 -->
            <we-body
                v-for="children in body.component.children.lists"
                :key="children.uid"
                :app="app"
                :scene="body"
                :body="children"
                :requiredLevel="body.levelDesign.getRequired(body.level)"
                @onchangesize="onChangeSize" />
        </div>

    </div>
</template>

<script>
import { SCENE_2D, SCENE_3D } from '../Scene/Vars/TYPE'
import ComponentPhysics from '../Components/Physics/Component'
import ComponentText from '../Components/Text/Component'
import ComponentHtml from '../Components/Html/Component'
import ComponentImage from '../Components/Image/Component'
import ComponentVideo from '../Components/Video/Component'
import ComponentRect from '../Components/Rect/Component'
import ComponentAudio from '../Components/Audio/Component'
import ComponentParticle from '../Components/Particle/Component'
import ParticleRenderer from './ParticleRenderer.vue'

import hasComponent from './Methods/hasComponent'
import onChangeSize from './Methods/onChangeSize'
import calcSizeMax from './Methods/calcSizeMax'
import isNeedFromScene from './Methods/isNeedFromScene'
import startResizeObserve from './Methods/startResizeObserve'
import destroyResizeObserve from './Methods/destroyResizeObserve'
import translate from './Methods/translate'
import emit from './Methods/emit'

import isScene from './Computed/isScene'
import centerPointX from './Computed/centerPointX'
import centerPointY from './Computed/centerPointY'


export default {

    name: 'WeBody',
    components: {
        ComponentPhysics,
        ComponentText,
        ComponentHtml,
        ComponentImage,
        ComponentVideo,
        ComponentRect,
        ComponentAudio,
        ComponentParticle,
        ParticleRenderer,
    },
    props: ['app', 'scene', 'body', 'coords', 'requiredLevel'],
    data: () => ({
        updateRequestId: null,
        sizeObserver: null,
        sizeSelf: [0, 0],
        sizeChild: [0, 0],
        sizeMax: [0, 0],
        SCENE_2D,
        SCENE_3D,
    }),

    computed: {
        isScene,
        centerPointX,
        centerPointY,
    },
    methods: {
        hasComponent,
        onChangeSize,
        calcSizeMax,
        isNeedFromScene,
        startResizeObserve,
        destroyResizeObserve,
        translate,
        emit,
    },

    watch: {
        'sizeSelf'() { this.calcSizeMax() },
        'sizeChild'() { this.calcSizeMax() },
        // 최소한의 성능 향상을 위하여 Attribute bind 기능을 이용하지 않았습니다.
        'body.component.transform': {
            deep: true,
            handler() { this.translate() }
        },
        'body.physics.collision.collisions': {
            deep: true,
            handler(v) {
                const { collisions } = this.body.physics.collision
                const updatedPairs = collisions[collisions.length - 1]
                this.body.physics.collision.emit('collision-update', null, updatedPairs)
            }
        }
    },

    mounted() {
        this.startResizeObserve()
        this.body.cycleStart()
        this.updateRequestId = this.body.cycleUpdate()
    },

    beforeDestroy() {
        this.destroyResizeObserve()
        this.body.cycleDestroy(this.updateRequestId)
    }

}
</script>

<style lang="scss" scoped>
.we-camera,
.we-body {
    position: absolute;
    outline: none;

    &.scene3d {
        top: 50%;
        left: 50%;
        transform-style: preserve-3d;
    }
}

.we-components {
    position: relative;
}

.we-components-hidden {
    width: 0;
    height: 0;
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>