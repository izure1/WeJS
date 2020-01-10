class Searcher {

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
    this._app = v
  }

  get appReady() {
    if (!this.app) throw '초기화되지 않았습니다. app 속성을 지정하십시오.'
    if (!this.app.element) throw '앱이 초기화되지 않았습니다. app.element 속성을 지정하십시오.'
    if (!this.app.appElement) throw '앱이 시작되지 않았습니다. app.launch 메서드를 사용하십시오.'
    return true
  }

  getElementFromTag(v) {

    if (!this.appReady) return []

    let lists
    lists = this.app.appElement.querySelectorAll(`div[we-body-tag~="${v}"]`)
    lists = Array.from(lists)
    lists = lists.map(el => el.parentElement.parentElement)
    return lists

  }

  getElementFromId(v) {
    if (!this.appReady) return null
    return this.app.appElement.querySelector(`#${v}`)
  }

  getElementFromChildren(v) {
    const bodyClassName = 'we-body'
    if (!v instanceof HTMLElement) return null
    do v = v.parentElement
    while (v && !v.classList.contains(bodyClassName))
    return v
  }

}


export default Searcher