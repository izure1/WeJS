<template>
  <div></div>
</template>

<script>
  import Component from '../../View/Component/Component'

  import _setLoadedPromise from './Helper/_setLoadedPromise'
  import play from './Helper/play'
  import pause from './Helper/pause'
  import waitLoading from './Helper/waitLoading'

  import onChangeAudioSrc from './Methods/onChangeAudioSrc'
  import reloadAudio from './Methods/reloadAudio'
  import setAudioProperty from './Methods/setAudioProperty'
  import observeAudioPosition from './Methods/observeAudioPosition'
  import destroyObserve from './Methods/destroyObserve'


  export class Reservation extends Component {

    name = 'audio'
    src = null
    muted = false
    loop = false
    playbackRate = 1
    volume = 1
    recaching = 150

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
      intervalIndex: null,
    }),
    methods: {
      onChangeAudioSrc,
      reloadAudio,
      setAudioProperty,
      observeAudioPosition,
      destroyObserve,
    },

    created() {
      this.reloadAudio()
    },
    mounted() {
      this.observeAudioPosition()
    },
    beforeDestroy() {
      if (this.audio) this.audio.unload()
      this.destroyObserve()
    },

    watch: {
      audio() {
        this.setAudioProperty()
      },
      'body.component.audio.src'() {
        this.onChangeAudioSrc()
      },
      'body.component.audio': {
        deep: true,
        handler() {
          this.setAudioProperty()
        }
      }
    }

  }
</script>