class Searcher {

  static parseElement(el) {

    if (el instanceof String || typeof el === 'string') return document.querySelector(el)
    if (el instanceof NodeList) return Array.from(el)[0]
    if (el instanceof HTMLElement) return el
    return null

  }

  isAppReady(app) {
    if (!app.element) throw '앱이 초기화되지 않았습니다. app.element 속성을 지정하십시오.'
    if (!app.appElement) throw '앱이 시작되지 않았습니다. app.launch 메서드를 사용하십시오.'
    return true
  }

  getElementsFromTag(app, v) {

    if (!this.isAppReady(app)) return []

    let lists
    lists = app.appElement.querySelectorAll(`div[we-body-tag~="${v}"]`)
    lists = Array.from(lists)
    return lists

  }

  getElementFromId(app, v) {
    if (!this.isAppReady(app)) return null
    return app.appElement.querySelector(`#${v}`)
  }

  getParentElementFromChildren(v) {
    const bodyClassName = 'we-body'
    if (!v instanceof HTMLElement) return null
    do v = v.parentElement
    while (v && !v.classList.contains(bodyClassName))
    return v
  }

}


export default Searcher