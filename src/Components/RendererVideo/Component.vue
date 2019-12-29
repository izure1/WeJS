<template>
  <div>
    <video :src="body.component.rendererVideo.src" :width="body.component.rendererVideo.width"
      :height="body.component.rendererVideo.height" :controls="body.component.rendererVideo.controls"
      :loop="body.component.rendererVideo.loop" :autoplay="body.component.rendererVideo.autoplay"
      :muted="body.component.rendererVideo.muted" />
  </div>
</template>

<script>
  import onChangeVideoSrc from './Methods/onChangeVideoSrc'
  import onCanPlayThrough from './Methods/onCanPlayThrough'
  import reloadVideo from './Methods/reloadVideo'
  import modifyVideoProperty from './Methods/modifyVideoProperty'
  import addVideoLoadHandler from './Methods/addVideoLoadHandler'

  import _setCanplayPromise from './helper/_setCanplayPromise'
  import waitLoading from './helper/waitLoading'
  import pause from './helper/pause'
  import play from './helper/play'

  export function RESERVATION() {

    const ref = {
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

      _setCanplayPromise,
      waitLoading,
      play,
      pause,
    }

    // 비디오가 이벤트를 발생시키면 그에 맞는 resolve가 호출되고, 프로미스가 resolved됩니다.
    // 이 데이터는 저장되어선 안되므로 enumerable: false 상태입니다.
    ref._setCanplayPromise.call(ref)
    return ref

  }

  export default {
    props: ['body'],
    data() {
      return {
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
        // 주소가 변경되면 비디오를 새롭게 불러들이고, body.component.rendererVideo._canplay
        this.onChangeVideoSrc()
      },
      element() {
        this.modifyVideoProperty()
      },
      'body.component.rendererVideo.playbackRate'() {
        this.modifyVideoProperty()
      },
      'body.component.rendererVideo.volume'() {
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