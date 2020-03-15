import Definer from './Definer'


/**
 * 
 *  TODO
 *  Vue 2.0 에서 Array subClass를 지원하지 않습니다.
 *  반응성과 확장 기능을 동시에 이용하기가 불가능하므로, Vue 3.0으로 업데이트 하기 전까지는 아래의 편법 방식을 사용합니다.
 *  이후 업데이트하면 주석처리된 코드를 활용하도록 합니다.
 * 
 */
// class Arrayset extends Array {

//     static makeReactive(obj) {
//         const proto = obj.__proto__
//         Object.defineProperty(obj, '__proto__', {
//             get() { return proto },
//             set(v) { proto.__proto__ = v }
//         })
//     }

//     constructor(...params) {
//         super(...params)
//         Arrayset.makeReactive(this)
//     }

//     add(v) {
//         const i = this.indexOf(v)
//         if (i !== -1) return i
//         return this.push(v)
//     }

//     has(v) {
//         return this.indexOf(v) !== -1
//     }

//     clear() {
//         this.splice(0, this.length)
//     }

//     delete(v) {
//         const i = this.indexOf(v)
//         if (i === -1) return false
//         this.splice(i, 1)
//         return true
//     }

//     *generate() {
//         for (const t of this) yield t
//     }

// }

const Arrayset = function Arrayset(...lists) {

    const array = [...lists]
    const add = function add(...list) {
        for (const t of [...list]) {
            if (array.indexOf(t) !== -1) continue
            else array.push(t)
        }
        return array
    }
    const has = function has(t) {
        return array.indexOf(t) !== -1
    }
    const hasAll = function hasAll(...list) {
        let passed = true
        for (const t of [...list]) {
            if (!has(t)) {
                passed = false
                break
            }
        }
        return passed
    }
    const hasAtLeast = function hasAtLeast(...list) {
        let passed = false
        for (const t of [...list]) {
            if (has(t)) {
                passed = true
                break
            }
        }
        return passed
    }
    const duplicate = function duplicate(...list) {
        return [...list].filter(t => has(t))
    }
    const notDuplicate = function notDuplicate(...list) {
        return [...list].filter(t => !has(t))
    }
    const clear = function clear() {
        array.splice(0, array.length)
    }
    const _delete = function _delete(v) {
        const i = array.indexOf(v)
        if (i === -1) return false
        array.splice(i, 1)
        return true
    }
    const generate = function *generate() {
        for (const t of array) yield t
    }

    Definer.create('add', add)          .seal(true).hidden(true).final(true).to(array)
    Definer.create('has', has)          .seal(true).hidden(true).final(true).to(array)
    Definer.create('hasAll', hasAll)   .seal(true).hidden(true).final(true).to(array)
    Definer.create('hasAtLeast', hasAtLeast)   .seal(true).hidden(true).final(true).to(array)
    Definer.create('duplicate', duplicate)   .seal(true).hidden(true).final(true).to(array)
    Definer.create('notDuplicate', notDuplicate)   .seal(true).hidden(true).final(true).to(array)
    Definer.create('clear', clear)      .seal(true).hidden(true).final(true).to(array)
    Definer.create('delete', _delete)   .seal(true).hidden(true).final(true).to(array)
    Definer.create('generate', generate).seal(true).hidden(true).final(true).to(array)

    return array

}


export default Arrayset