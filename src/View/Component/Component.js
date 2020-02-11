import Definer from '../../Utils/Definer'
import WeJSEventEmitter from '../../WeJSEvent/WeJSEventEmitter'

import Matter from 'matter-js'
window.a = Matter

class Component extends WeJSEventEmitter {

    static waitAttached(component) {
        return component.__vue_ready
    }

    static attachVue(component, vue) {
        component.__vue = vue
        component.__vue_init(this)
        return component.__vue
    }

    constructor(info) {

        super()

        this.name = null
        Object.assign(this, info)

        Definer
            .create('__vue_init', null)
            .seal(true).hidden(true).final(false)
            .to(this)

        Definer
            .create('__vue_ready', new Promise(resolve => { this.__vue_init = resolve }))
            .seal(true).hidden(true).final(true)
            .to(this)

        Definer
            .create('__vue', null)
            .seal(true).hidden(true).final(false)
            .to(this)

    }

    get vue() {
        return this.__vue
    }

}


export default Component