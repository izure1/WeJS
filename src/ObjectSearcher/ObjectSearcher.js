class ObjectSearcher {

  static parseElement(el) {

    if (el instanceof String || typeof el === 'string') return document.querySelector(el)
    if (el instanceof NodeList) return Array.from(el)[0]
    if (el instanceof HTMLElement) return el
    return null

  }

  constructor() {
    this._app
  }

  get app() {
    return this._app
  }
  set app(v) {
    this._app = TagFinder.parseElement(v)
  }

  getFromTag(v) {

  }

}