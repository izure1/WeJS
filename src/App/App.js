import Definer from '../Utils/Definer'
import Arrayset from '../Utils/Arrayset'

import addScene from './AppMethods/addScene'
import dropScene from './AppMethods/dropScene'
import onSplash from './AppMethods/onSplash'
import start from './AppMethods/start'
import launch from './AppMethods/launch'
import destroy from './AppMethods/destroy'
import fullscreen from './AppMethods/fullscreen'
import exitFullscreen from './AppMethods/existFullscreen'


class App {

    static parseElement(el) {
        if (el instanceof String || typeof el === 'string') return document.querySelector(el)
        if (el instanceof NodeList) return Array.from(el)[0]
        if (el instanceof HTMLElement) return el
        return null
    }

    constructor() {

        Definer
            .create('__element', null)
            .seal(true).hidden(true).final(false)
            .to(this)

        Definer
            .create('__preloadFns', [])
            .seal(true).hidden(true).final(true)
            .to(this)

        Definer
            .create('app', null)
            .seal(true).hidden(true).final(false)
            .to(this)

        this.scenes = new Arrayset
        this.width = 800
        this.height = 450
        this.backgroundColor = 'white'
        this.borderWidth = 0
        this.borderColor = 'black'
        this.perspective = 100

    }

    get preload() {
        return this.__preloadFns
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

App.prototype.addScene = addScene
App.prototype.dropScene = dropScene
App.prototype.onSplash = onSplash
App.prototype.start = start
App.prototype.launch = launch
App.prototype.destroy = destroy
App.prototype.fullscreen = fullscreen
App.prototype.exitFullscreen = exitFullscreen


export default App