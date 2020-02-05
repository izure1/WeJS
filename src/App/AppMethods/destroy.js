export default function destroy() {

  if (!this.app) return
  this.scenes.clear()
  this.app.$destroy()

}