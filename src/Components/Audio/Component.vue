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
  import modifyAudioProperty from './Methods/modifyAudioProperty'


  export class RESERVATION extends Component {

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

  RESERVATION.prototype._setLoadedPromise = _setLoadedPromise
  RESERVATION.prototype.play = play
  RESERVATION.prototype.pause = pause
  RESERVATION.prototype.waitLoading = waitLoading

  export default {

    props: ['body'],
    data: () => ({
      audio: null,
    }),
    methods: {
      onChangeAudioSrc,
      reloadAudio,
      modifyAudioProperty,
    },
    created() {
      this.reloadAudio()
    },
    beforeDestroy() {
      if (this.audio) this.audio.unload()
    },
    watch: {
      'body.component.audio.src'() {
        this.onChangeAudioSrc()
      },
      audio() {
        this.modifyAudioProperty()
      },
      'body.component.audio': {
        deep: true,
        handler() {
          this.modifyAudioProperty()
        }
      }
    }

  }
</script>