import Matter from 'matter-js'

import Arrayset from '../Utils/Arrayset'
import Definer from '../Utils/Definer'
import View from '../View/View'
import ScenePhysics from './ScenePhysics'
import ComponentFactory from '../View/ComponentFactory/ComponentFactory'

import RESERVATION from '../Components/RESERVATION'


class Scene extends View {

    constructor() {

        super()
        this.gravityX = 0
        this.gravityY = -9.8
        this.colliders = new Arrayset

        const factory = new ComponentFactory
        this.component.add(factory.create(RESERVATION.CHILDREN))

        /*
        *  씬 객체는 내부적으로 컴포넌트가 아닌, 물리 세계(physics-world)를 가지고 있습니다.
        *  씬의 children 컴포넌트로 추가된 하위 객체들은, physics 컴포넌트로 물리효과를 만들 시 물리 세계를 참조합니다.
        *  Ex) scene.physicsWorld.yourJob
        * 
        *  씬의 물리세계는 수정하거나 파괴할 수 없습니다.
        * 
        */

        Definer
            .create('physics', new ScenePhysics(this.component.children.lists))
            .seal(true).hidden(true).final(true)
            .to(this)

    }

    /**
     * 
     * @param {String} e  이벤트 타입
     * @param {Object} detail  이벤트의 상세 정보
     * @description  emit 메서드와 사용방법은 똑같지만, 이 씬에 소속된 모든 객체에게 이벤트가 발생합니다.
     */
    broadcast(e, detail) {
        for (const children of this.component.children.lists) {
            children.emit(e, detail)
        }
    }

    /**
     * @description  씬의 모든 내용을 초기화합니다.
     * @returns  Scene
     */
    clear() {
        this.component.children.lists.clear()
        this.lifecycle.dataTransfer.clear()
        this.physics.init()
        return this
    }

}


export default Scene