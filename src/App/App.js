import Arrayset from '../Utils/Arrayset'

import addScene from './AppMethods/addScene'
import dropScene from './AppMethods/dropScene'
import launch from './AppMethods/launch'
import destroy from './AppMethods/destroy'
import setSize from './AppMethods/setSize'
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
    this._element = null
    this.app = null
    this.scenes = new Arrayset
    this.width = 800
    this.height = 450
    this.backgroundColor = 'white'
    this.borderWidth = 0
    this.borderColor = 'black'
    this.perspective = 100
  }

  get element() {
    return this._element
  }
  set element(v) {
    this._element = App.parseElement(v)
  }

  get appElement() {
    if (!this.app) return null
    return this.app.$el
  }

}

App.prototype.addScene = addScene
App.prototype.dropScene = dropScene
App.prototype.launch = launch
App.prototype.destroy = destroy
App.prototype.setSize = setSize
App.prototype.fullscreen = fullscreen
App.prototype.exitFullscreen = exitFullscreen


export default App