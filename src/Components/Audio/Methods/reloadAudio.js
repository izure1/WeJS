import {
  Howl
} from 'howler'


export default function reloadAudio() {

  const src = this.body.component.audio.src

  if (this.audio instanceof Howl) this.audio.unload()
  return new Promise((resolve, reject) => {
    this.audio = new Howl({ src })
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