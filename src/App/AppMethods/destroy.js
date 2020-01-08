export default function destroy() {

  if (!this.app) return
  this.scene = null
  this.app.$destroy()

}