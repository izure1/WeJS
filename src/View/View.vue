<template>
  <div v-if="isNeedFromScene(requiredLevel, body.level)" :id="body.id" class="we-body" :we-body-size="sizeMax" :style="{ 
    transform: `translate3d(
      ${centerPointX}px,
      ${centerPointY}px,
      ${-body.component.transform.z}px) 
      rotateX(${body.component.transform.rotateX}deg)
      rotateY(${-body.component.transform.rotateY}deg)
      rotateZ(${body.component.transform.rotateZ}deg)
      scale(${body.component.transform.scale})`,
    transition: `
      all
      ${body.component.transform.duration}ms
      ${body.component.transform.ease}
      ${body.component.transform.delay}ms`,
  }">

    <!-- 
      현재 객체를 필터 처리 합니다.
      필터는 현재 객체의 컴포넌트 ELement만 적용됩니다.
      filter 속성이 주어질 경우, 자식 Element는 transform-origin: preserve-3d 을 사용할 수 없기 때문입니다.
    -->
    <div class="we-components" :style="{
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
        sepia(${body.component.filter.sepia})`
    }">

      <!-- 
        화면에 시각적으로 보이는 컴포넌트를 이곳에 넣습니다.
        이 컴포넌트들은 position: static이므로, 위에서 아래로 순차대로 쌓입니다.
      -->
      <div class="we-components-visible">
        <component-text v-if="              hasComponent('text')" :app="app" :scene="scene" :body="body" />
        <component-html v-if="              hasComponent('html')" :app="app" :scene="scene" :body="body" />
        <component-renderer-image v-if="    hasComponent('rendererImage')" :app="app" :scene="scene" :body="body" />
        <component-renderer-video v-if="    hasComponent('rendererVideo')" :app="app" :scene="scene" :body="body" />
      </div>

      <!-- 
        화면에 시각적으로 보이지 않는 컴포넌트를 이곳에 넣습니다.
      -->
      <div class="we-components-hidden">
        <component-physics-world v-if="     hasComponent('physicsWorld')" :app="app" :scene="scene" :body="body" />
        <component-physics v-if="           hasComponent('physics')" :app="app" :scene="scene" :body="body" />
        <component-tag v-if="               hasComponent('tag')" :app="app" :scene="scene" :body="body" />
        <component-audio v-if="             hasComponent('audio')" :app="app" :scene="scene" :body="body" />
      </div>

    </div>

    <!-- Children 컴포넌트에 있는 하위 자식 객체를 추가합니다. -->
    <div v-if="hasComponent('children')" class="we-camera" :style="{ 
      transform: `translate3d(
        ${-body.component.camera.x}px,
        ${body.component.camera.y}px,
        ${body.component.camera.z}px) 
        rotateX(${-body.component.camera.rotateX}deg)
        rotateY(${body.component.camera.rotateY}deg)
        rotateZ(${-body.component.camera.rotateZ}deg)` }">
      <we-body v-for="(children, i) in body.component.children.lists" :key="i" :app="app" :scene="scene"
        :body="children" :requiredLevel="body.levelDesign.getRequired(body.level)" @onsizechange="onSizeChange" />
    </div>

  </div>
</template>

<script>
  import View from './View.js'
  import ComponentPhysicsWorld from '../Components/PhysicsWorld/Component'
  import ComponentPhysics from '../Components/Physics/Component'
  import ComponentText from '../Components/Text/Component'
  import ComponentHtml from '../Components/Html/Component'
  import ComponentRendererImage from '../Components/RendererImage/Component'
  import ComponentRendererVideo from '../Components/RendererVideo/Component'
  import ComponentTag from '../Components/Tag/Component'
  import ComponentAudio from '../Components/Audio/Component'

  import hasComponent from './Methods/hasComponent'
  import onSizeChange from './Methods/onSizeChange'
  import calcSizeMax from './Methods/calcSizeMax'
  import isNeedFromScene from './Methods/isNeedFromScene'

  import centerPointX from './Computed/centerPointX'
  import centerPointY from './Computed/centerPointY'


  export default {

    name: 'WeBody',
    components: {
      ComponentPhysicsWorld,
      ComponentPhysics,
      ComponentText,
      ComponentHtml,
      ComponentRendererImage,
      ComponentRendererVideo,
      ComponentTag,
      ComponentAudio,
    },
    props: ['app', 'scene', 'body', 'coords', 'requiredLevel'],
    data: () => ({
      sizeObserver: null,
      sizeSelf: [0, 0],
      sizeChild: [0, 0],
      sizeMax: [0, 0],
    }),

    computed: {
      centerPointX,
      centerPointY,
    },
    methods: {
      hasComponent,
      onSizeChange,
      calcSizeMax,
      isNeedFromScene,
    },

    watch: {

      sizeSelf() {
        this.calcSizeMax()
      },
      sizeChild() {
        this.calcSizeMax()
      },

    },

    mounted() {

      if (!this.$el) return

      const onResize = () => {
        if (this.$el) return
        const style = getComputedStyle(this.$el)
        this.sizeSelf = [style.width, style.height].map(n => parseFloat(n))
        this.$emit('onsizechange', this.sizeSelf)
      }

      this.sizeObserver = new ResizeObserver(onResize)
      this.sizeObserver.observe(this.$el)

    },

    beforeDestroy() {
      if (this.sizeObserver) this.sizeObserver.disconnect()
    }

  }
</script>

<style lang="scss" scoped>
  .we-camera,
  .we-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-style: preserve-3d;
  }

  .we-components {
    position: relative;
  }

  .we-components-hidden {
    width: 0;
    height: 0;
    visibility: none;
    position: absolute;
    left: 50%;
    top: 50%;
  }
</style>