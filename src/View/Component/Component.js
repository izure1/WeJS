import Definer from '../../Utils/Definer'
import WeJSEventEmitter from '../../WeJSEvent/WeJSEventEmitter'


class Component extends WeJSEventEmitter {

  constructor(info) {

    super()

    this.name = null
    Object.assign(this, info)

    Definer.create('__vue', null)
      .seal(true).hidden(true).final(false)
      .to(this)

  }

  get vue() {
    return this.__vue
  }

  setVue(vue) {
    this.__vue = vue
    return this.vue
  }

  destroy() {
    Object.getOwnPropertyNames(this).forEach(property => {
      const attribute = Object.getOwnPropertyDescriptor(this, property)
      if (attribute.writable) this[property] = null
      if (attribute.configurable) delete this[property]
    })
  }

}


export default Component