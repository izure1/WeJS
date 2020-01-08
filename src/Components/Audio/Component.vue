<template>
  <div></div>
</template>

<script>
  import Component from '../../WeJSObject/Component/Component'

  import _setLoadedPromise from './Helper/_setLoadedPromise'
  import play from './Helper/play'
  import pause from './Helper/pause'
  import waitLoading from './Helper/waitLoading'

  import onChangeAudioSrc from './Methods/onChangeAudioSrc'
  import reloadAudio from './Methods/reloadAudio'
  import setAudioProperty from './Methods/setAudioProperty'
  import setAudioPosition from './Methods/setAudioPosition'


  export class Reservation extends Component {

    name = 'audio'
    src = null
    muted = false
    loop = false
    playbackRate = 1
    volume = 1

    constructor(...args) {
      super(...args)
      this._setLoadedPromise()
    }

  }

  Reservation.prototype._setLoadedPromise = _setLoadedPromise
  Reservation.prototype.play = play
  Reservation.prototype.pause = pause
  Reservation.prototype.waitLoading = waitLoading

  export default {

    props: ['body', 'app'],
    data: () => ({
      audio: null,
    }),
    methods: {
      onChangeAudioSrc,
      reloadAudio,
      setAudioProperty,
      setAudioPosition,
    },
    created() {
      this.reloadAudio()
    },
    beforeDestroy() {
      if (this.audio) this.audio.unload()
    },
    watch: {

      // 앱의 메인씬의 카메라나 위치가 변경될 경우, 이를 감지합니다.
      // 변경된 위치를 기반으로 오디오의 위치를 수정해야 합니다.
      'app.scene.component.transform': {
        deep: true,
        handler() {
          this.setAudioPosition()
        }
      },
      'app.scene.component.camera': {
        deep: true,
        handler() {
          this.setAudioPosition()
        }
      },

      'body.component.audio.src'() {
        this.onChangeAudioSrc()
      },
      audio() {
        this.setAudioProperty()
        this.setAudioPosition()
      },
      'body.component.audio': {
        deep: true,
        handler() {
          this.setAudioProperty()
          this.setAudioPosition()
        }
      }
    }

  }
</script>