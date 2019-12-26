import launch from './Methods/launch'
import destroy from './Methods/destroy'
import setSize from './Methods/setSize'
import fullscreen from './Methods/fullscreen'
import exitFullscreen from './Methods/existFullscreen'


class App {

  static parseElement(el) {

    if (el instanceof String || typeof el === 'string') return document.querySelector(el)
    if (el instanceof NodeList) return Array.from(el)[0]
    if (el instanceof HTMLElement) return el
    return null

  }

  constructor() {
    this._element = null
    this._app = null
    this._width = 800
    this._height = 450
    this._backgroundColor = 'white'
    this._borderWidth = 0
    this._borderColor = 'black'
    this._perspective = 100
  }

  get element() {
    return this._element
  }
  set element(v) {
    this._element = App.parseElement(v)
  }

  get app() {
    return this._app
  }
  set app(v) {
    this._app = v
  }

  get width() {
    return this._width
  }
  set width(v) {
    this._width = v
  }

  get height() {
    return this._height
  }
  set height(v) {
    this._height = v
  }

  get borderWidth() {
    return this._borderWidth
  }
  set borderWidth(v) {
    this._borderWidth = v
  }

  get borderColor() {
    return this._borderColor
  }
  set borderColor(v) {
    this._borderColor = v
  }

  get backgroundColor() {
    return this._backgroundColor
  }
  set backgroundColor(v) {
    this._backgroundColor = v
  }

  get perspective() {
    return this._perspective
  }
  set perspective(v) {
    this._perspective = v
  }

}

App.prototype.launch = launch
App.prototype.destroy = destroy
App.prototype.setSize = setSize
App.prototype.fullscreen = fullscreen
App.prototype.exitFullscreen = exitFullscreen


export default App