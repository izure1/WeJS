import Scene3d from '../Scene/Scene3d'

import start from './AppMethods/start'
import destroy from './AppMethods/destroy'
import fullscreen from './AppMethods/fullscreen'
import exitFullscreen from './AppMethods/existFullscreen'


class App extends Scene3d {

    static parseElement(el) {
        if (el instanceof String || typeof el === 'string') return document.querySelector(el)
        if (el instanceof NodeList) return Array.from(el)[0]
        if (el instanceof HTMLElement) return el
        return null
    }

    constructor(...args) {

        super(...args)

        this.width = 800
        this.height = 450
        this.perspective = 100

    }

    get element() {
        return this.__element
    }
    set element(v) {
        this.__element = App.parseElement(v)
    }
    get appElement() {
        if (!this.app) return null
        return this.app.$el
    }
    get size() {
        return [this.width, this.height]
    }
    set size(v) {
        this.width = v[0]
        this.height = v[1]
    }

}

App.prototype.start = start
App.prototype.destroy = destroy
App.prototype.fullscreen = fullscreen
App.prototype.exitFullscreen = exitFullscreen


export default App