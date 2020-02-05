<template>
  <div>
    <video :src="loader.getUri(body.component.video.src)" :width="body.component.video.width"
      :height="body.component.video.height" :controls="body.component.video.controls"
      :loop="body.component.video.loop" :autoplay="body.component.video.autoplay"
      :muted="body.component.video.muted" />
  </div>
</template>

<script>
  import AssetLoader from '../../Asset/AssetLoader/AssetLoader'
  import Component from '../../View/Component/Component'

  import onChangeVideoSrc from './Methods/onChangeVideoSrc'
  import onCanPlayThrough from './Methods/onCanPlayThrough'
  import reloadVideo from './Methods/reloadVideo'
  import modifyVideoProperty from './Methods/modifyVideoProperty'
  import addVideoLoadHandler from './Methods/addVideoLoadHandler'

  import _setCanplayPromise from './Helper/_setCanplayPromise'
  import waitLoading from './Helper/waitLoading'
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
      this._setCanplayPromise()
    }
  }

  Reservation.prototype._setCanplayPromise = _setCanplayPromise
  Reservation.prototype.waitLoading = waitLoading
  Reservation.prototype.play = play
  Reservation.prototype.pause = pause

  export default {
    props: ['body'],
    data() {
      return {
        loader: new AssetLoader,
        start: 0,
        element: null,
        mountResolve: null,
        mountPromise: null,
      }
    },
    methods: {
      onChangeVideoSrc,
      onCanPlayThrough,
      reloadVideo,
      modifyVideoProperty,
      addVideoLoadHandler,
    },
    created() {
      // template가 마운트될 때 resolve되는 promise 객체를 담습니다.
      // 이후 마운트되었는지 확인하고 싶다면 await this.mountPromise 처럼 이용하십시오.
      this.mountPromise = new Promise(resolve => {
        this.mountResolve = resolve
      })
    },
    mounted() {
      // 비디오 element에 onloadedmetadata, oncanplaythrough 이벤트 핸들러 최초 1회 할당합니다.
      this.addVideoLoadHandler()
      // 마운트 완료 시점을 알려주는 mouseResolve 호출
      this.mountResolve()
      // 비디오를 초기화하기 위해서 onChangeVideoSrc 함수를 호출합니다.
      this.reloadVideo()
    },
    watch: {
      src() {
        // 주소가 변경되면 비디오를 새롭게 불러들이고, body.component.video._canplay
        this.onChangeVideoSrc()
      },
      element() {
        this.modifyVideoProperty()
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