import { Random } from '../Utils/MathUtil'
import Definer from '../Utils/Definer'
import WeJSEventEmitter from '../WeJSEvent/WeJSEventEmitter'

import Arrayset from '../Utils/Arrayset'
import ComponentList from './ComponentList/ComponentList'
import ComponentFactory from './ComponentFactory/ComponentFactory'
import LevelDesign from './LevelDesign/LevelDesign'

import RESERVATION from '../Components/RESERVATION'


class View extends WeJSEventEmitter {

    constructor(raw = {
        id: null,
        level: LevelDesign.PERSISTENT_LEVEL,
        levelDesign: new LevelDesign,
        component: new ComponentList
    }) {

        super()

        const {
            id,
            level,
            levelDesign,
            component,
        } = raw

        this.id = id
        this.level = level
        this.levelDesign = levelDesign
        this.tags = new Arrayset
        this.component = new ComponentList(component)

        const factory = new ComponentFactory
        this.component.add(factory.create(RESERVATION.CAMERA))
        this.component.add(factory.create(RESERVATION.TRANSFORM))
        this.component.add(factory.create(RESERVATION.FILTER))



        Definer
            .create('uid', Random.shortid())
            .seal(true).hidden(true).final(true)
            .to(this)

        /**
         * 
         *  객체의 라이프사이클을 담을 공간을 추가합니다.
         *  여기에서 선언된 라이프사이클은, vue 라이프사이클과 함께 동작합니다.
         * 
         */
        Definer
            .create('__lifecycle', new Map)
            .seal(true).hidden(true).final(true)
            .to(this)

        this.__lifecycle.preloadFns = []
        this.__lifecycle.startFns = []
        this.__lifecycle.updateFns = []
        this.__lifecycle.destroyFns = []
        this.__lifecycle.dataTransfer = new Map

    }

    get lifecycle() {
        return {
            preload: this.__lifecycle.preloadFns,
            start: this.__lifecycle.startFns,
            update: this.__lifecycle.updateFns,
            destroy: this.__lifecycle.destroyFns,
            dataTransfer: this.__lifecycle.dataTransfer,
        }
    }

    onPreload(fn) {
        this.__lifecycle.preloadFns.push(fn.bind(this))
        return this
    }
    onStart(fn) {
        this.__lifecycle.startFns.push(fn.bind(this))
        return this
    }
    onUpdate(fn) {
        this.__lifecycle.updateFns.push(fn.bind(this))
        return this
    }
    onDestroy(fn) {
        this.__lifecycle.destroyFns.push(fn.bind(this))
        return this
    }

}


export default View