class Searcher {

    static parseElement(el) {
        if (el instanceof String || typeof el === 'string') return document.querySelector(el)
        if (el instanceof NodeList) return Array.from(el)[0]
        if (el instanceof HTMLElement) return el
        return null
    }

    static isChildren(view, parent, deep = false) {
        const childrens = parent.component.children

        if (!childrens)
            return false

        if (childrens.lists.has(view))
            return true

        else if (!deep)
            return false
        
        const generator = childrens.lists.generate()
        let found = false
        let next = null

        while (next = generator.next()) {
            if (found)
                break
            if (next.done)
                break
            else
                found = Searcher.isChildren(view, next.value, true)
        }

        return found
    }

    static isAppReady(app) {
        if (!app.element) throw '앱이 초기화되지 않았습니다. app.element 속성을 지정하십시오.'
        if (!app.appElement) throw '앱이 시작되지 않았습니다. app.launch 메서드를 사용하십시오.'
        return true
    }

    static getElementsFromTag(app, v) {

        if (!Searcher.isAppReady(app))
            return []

        const lists = app.appElement.querySelectorAll(`div[we-body-tag~="${v}"]`)
        return Array.from(lists)

    }

    static getElementFromId(app, v) {

        if (!Searcher.isAppReady(app))
            return null

        return app.appElement.querySelector(`#${v}`)

    }

    static getParentElementFromChildren(v) {

        const bodyClassName = 'we-body'

        if (!v instanceof HTMLElement)
            return null

        do
            v = v.parentElement
        while (v && !v.classList.contains(bodyClassName))
        return v

    }

}


export default Searcher