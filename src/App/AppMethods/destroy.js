export default async function destroy() {

    if (!this.app) return

    this.component.children.lists.clear()
    
    await this.app.$nextTick()
    this.app.$destroy()
    this.app = null

}