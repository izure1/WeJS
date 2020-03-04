import WeJSEventEmitter from '../WeJSEvent/WeJSEventEmitter'


class Reactive extends WeJSEventEmitter {

    constructor() {
        super()
        return new Proxy(this, {
            get(target, property) {
                target.emit('reactive-get')
                return target[property]
            },
            set(target, property, next) {
                const before = target[property]
                target[property] = next
                target.emit('reactive-set', { before, next })
                return true
            },
            deleteProperty(target, property) {
                delete target[property]
                target.emit('reactive-delete-property', { property })
            }
        })
    }

}


export default Reactive