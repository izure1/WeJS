<template>
  <div>
    <video :src="loader.getUri(body.component.video.src)" :width="body.component.video.width"
      :height="body.component.video.height" :controls="body.component.video.controls" :loop="body.component.video.loop"
      :autoplay="body.component.video.autoplay" :muted="body.component.video.muted" />
  </div>
</template>

<script>
  import AssetLoader from '../../Asset/AssetLoader/AssetLoader'
  import Component from '../../View/Component/Component'

  import onChangeVideoSrc from './Methods/onChangeVideoSrc'
  import modifyVideoProperty from './Methods/modifyVideoProperty'

  import pause from './Helper/pause'
  import play from './Helper/play'


  export class Reservation extends Component {

    name = 'video'
    width = 'auto'
    height = 'auto'
    src = null
    controls = false
    autoplay = false
    muted = false
    loop = false

    playbackRate = 1
    volume = 1

    constructor(...args) {
      super(...args)
    }
  }

  Reservation.prototype.play = play
  Reservation.prototype.pause = pause

  export default {
    props: ['body'],
    data() {
      return {
        loader: new AssetLoader,
        start: 0,
        video: null,
        setVideo: null,
      }
    },
    methods: {
      onChangeVideoSrc,
      modifyVideoProperty,
    },
    created() {
      this.body.component.video.setVue(this)
      this.video = new Promise((resolve, reject) => {
        this.setVideo = resolve
      })
    },
    mounted(){
      this.setVideo(this.$el.querySelector('video'))
      this.body.component.video.emit('load')
    },
    beforeDestroy() {
      this.body.component.video.destroy()
    },
    watch: {
      src() {
        this.onChangeVideoSrc()
      },
      'body.component.video.playbackRate'() {
        this.modifyVideoProperty()
      },
      'body.component.video.volume'() {
        this.modifyVideoProperty()
      }
    }
  }
</script>

<style scoped>
  video {
    outline: none;
  }
</style>