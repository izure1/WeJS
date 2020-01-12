import {
  Howl
} from 'howler'
import path from 'path'


export default function reloadAudio() {

  const asset = this.loader.list.get(this.body.component.audio.src)
  const src = asset ? asset.uri : this.body.component.audio.src
  const format = asset ? asset.mime.split('/')[1] : path.extname(src).split('.').pop()

  if (this.audio instanceof Howl) this.audio.unload()
  return new Promise((resolve, reject) => {
    this.audio = new Howl({ src, format })
    this.audio.once('load', () => {
      this.body.component.audio.audio = this.audio
      this.body.component.audio._loadedResolve()
      resolve()
    })
    this.audio.once('loaderror', () => {
      this.body.component.audio.audio = null
      this.body.component.audio._loadedReject()
      reject()
    })
  })

}