<template>
  <div>
    <video :src="body.component.rendererVideo.src" :width="body.component.rendererVideo.width"
      :height="body.component.rendererVideo.height" :controls="body.component.rendererVideo.controls"
      :loop="body.component.rendererVideo.loop" :autoplay="body.component.rendererVideo.autoplay"
      :muted="body.component.rendererVideo.muted" />
  </div>
</template>

<script>
  import modifyVideoProperty from './Methods/modifyVideoProperty'

  import load from './helper/load'
  import pause from './helper/pause'
  import play from './helper/play'

  export const RESERVATION = {
    name: 'renderer-video',
    src: null,
    width: 'auto',
    height: 'auto',
    controls: false,
    autoplay: false,
    muted: false,
    loop: false,

    playbackRate: 1,
    volume: 1,

    load,
    play,
    pause,
  }

  export default {
    props: ['body'],
    data: () => ({
      element: null
    }),
    methods: {
      modifyVideoProperty
    },
    mounted() {
      this.element = this.$el.querySelector('video')
      this.body.component.rendererVideo._resolve(this.element)
    },
    watch: {
      element() {
        // template이 실제 Document에 부착되면 컴포넌트의 element를 수정합니다.
        this.modifyVideoProperty()
        Object.defineProperty(this.body.component.rendererVideo, '_element', {
          value: this.$el.querySelector('video'),
          configurable: true,
        })
      },
      'body.component.rendererVideo': {
        deep: true,
        handler() {
          this.modifyVideoProperty()
        }
      }
    }
  }
</script>

<style scoped>
  video {
    outline: none;
  }
</style>