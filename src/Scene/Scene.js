import Matter from 'matter-js'
import Vue from 'vue'

import Arrayset from '../Utils/Arrayset'
import Preloader from '../Utils/Preloader'

import View from '../View/View'
import ScenePhysics from './ScenePhysics'
import SceneParticle from './SceneParticle'
import ComponentFactory from '../View/ComponentFactory/ComponentFactory'

import RESERVATION from '../Components/RESERVATION'


class Scene extends View {

    constructor() {

        super()
        
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
        this.physics = new ScenePhysics(this)
        this.particle = new SceneParticle(this)

    }

    /**
     * 
     * @param {String} e  이벤트 타입
     * @param {Object} detail  이벤트의 상세 정보
     * @description  emit 메서드와 사용방법은 똑같지만, 이 씬에 소속된 모든 객체에게 이벤트가 발생합니다.
     */
    broadcast(e, detail, ...params) {
        for (const children of this.component.children.lists)
            children.emit(e, detail, ...params)
    }

    /**
     * @description  씬의 모든 내용을 초기화합니다.
     * @returns  Scene
     */
    clear() {
        this.component.children.lists.clear()
        this.lifecycle.dataTransfer.clear()
        this.particle.emitters.clear()
        this.physics.stop()
        return this
    }

    /**
     * 
     * @param {View|Scene} scene  실행할 뷰 또는 씬입니다.
     * @returns {Number}  씬이 children.lists 배열에 삽입된 오프셋입니다.
     * @description  이 씬에 하위 씬을 삽입합니다. 추가할 씬의 preload가 실행되고 나서, 현재 씬에 추가됩니다.
     */
    async addScene(scene) {
        if (!(scene instanceof View)) throw 'The scene argument must be WeJS.View instance.'
        await Preloader.waitPreloads(scene.lifecycle.preload, scene.lifecycle.dataTransfer)
        return this.component.children.lists.add(scene)
    }

    /**
     * 
     * @param {View|Scene} scene  삭제할 뷰 또는 씬입니다.
     * @returns {Boolean}  씬이 children.lists 배열에서 삭제되었는지 여부를 반환합니다. 만약 배열에 존재하지 않았다면 false를 반환합니다.
     * @description  현재 씬에서 실행 중인 씬을 삭제합니다.
     */
    async dropScene(scene) {
        if (!(scene instanceof View)) throw 'The scene argument must be WeJS.View instance.'
        return this.component.children.lists.delete(scene)
    }

    /**
     * 
     * @param  {...View|Scene} scenes  실행할 뷰 또는 씬입니다.
     * @returns {App}
     * @description
     * addScene 메서드와의 차이점은, 현재 씬에서 실행 중인 기존의 하위 씬들을 전부 삭제하고, 실행한다는 점입니다. 또한 여러 씬을 동시에추가할 수 있습니다.
     */
    async launch(...scenes) {
        this.component.children.lists.clear()
        await Promise.all([...scenes].map(scene => this.addScene(scene)))
        return this.app
    }

}


export default Scene