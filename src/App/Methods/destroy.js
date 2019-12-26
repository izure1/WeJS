export default function destroy() {

  if (!this.app) return
  this.app.$destroy()

}