<template>
    <div></div>
</template>

<script>
import AssetLoader from '../../Asset/AssetLoader/AssetLoader'
import Component from '../../View/Component/Component'

import play from './Helper/play'
import playLazy from './Helper/playLazy'
import pause from './Helper/pause'
import stop from './Helper/stop'

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

    constructor(...params) {
        super(...params)
    }

}

Reservation.prototype.play = play
Reservation.prototype.playLazy = playLazy
Reservation.prototype.pause = pause
Reservation.prototype.stop = stop

export default {

    props: ['body', 'app'],
    data: () => ({
        loader: new AssetLoader,
        audio: null,
        setAudio: null,
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
        Component.attachVue(this.body.component.audio, this)
        this.reloadAudio()
    },
    mounted() {
        this.observeAudioPosition()
    },
    beforeDestroy() {
        Promise.resolve().then(async () => {
            this.destroyObserve()
            const audio = await this.audio
            if (audio) audio.unload()
        })
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