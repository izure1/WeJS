import {
  Howl
} from 'howler'
import path from 'path'


export default function reloadAudio() {

  const asset = this.loader.list.get(this.body.component.audio.src)
  const src = asset ? asset.uri : this.body.component.audio.src
  const format = asset ? asset.mime.split('/')[1] : path.extname(src).split('.').pop()

  if (this.audio instanceof Howl) this.audio.unload()

  this.audio = new Promise((resolve, reject) => {

    const audio = new Howl({ src, format })
    audio.once('load', e => {
      this.setAudio(audio)
      this.body.component.audio.emit('load', e)
    })
    audio.once('loaderror', () => {
      reject()
    })

    this.setAudio = resolve

  })

}