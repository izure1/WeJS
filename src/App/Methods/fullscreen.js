import screenfull from 'screenfull'


export default function fullscreen() {
  if (!this.app) return
  if (screenfull.isEnabled) screenfull.request(this.app.$el)
}