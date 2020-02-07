import Matter from 'matter-js'

import Arrayset from '../Utils/Arrayset'
import Definer from '../Utils/Definer'
import View from '../View/View'
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
    this.initPhysicsSimulation()
    this.startPhysicsSimulation()

  }

  initPhysicsSimulation() {

    const engine = Matter.Engine.create()
    const runner = Matter.Runner.create()
    const world = engine.world

    // 물리 객체 만들기
    Definer
      .create('physics', engine)
      .seal(true).hidden(true).final(true)
      .to(this)

    // 물리 세계 만들기
    Definer
      .create('physicsWorld', world)
      .seal(true).hidden(true).final(true)
      .to(this)

    // 물리 업데이터 만들기
    Definer
      .create('physicsRunner', runner)
      .seal(true).hidden(true).final(true)
      .to(this)

    // 물리 객체 해쉬테이블 만들기
    Definer
      .create('physicsTable', new Map)
      .seal(true).hidden(true).final(true)
      .to(this)

  }

  /**
   * 
   * @param {WeakMap} table  PhysicsHashTable
   * @param {Matter.Composite} object  Matter.js Pairs
   * @param {View} body  WeJS.View
   * @description  물리시뮬레이터 해쉬테이블에 물리객체와 View 객체를 키와 값의 쌍으로 삽입합니다.
   */
  static appendHashTable(table, object, body) {
    table.set(object, body)
  }

  /**
   * 
   * @param {Arrayset|Array} lists  업데이트할 물리객체의 목록을 담은 배열이거나, 유사배열입니다.
   */
  static updatePhysicsRender(lists) {
    lists.forEach(t => { if (t.component.physics) t.component.physics.vue.update() })
  }

  /**
   * 
   * @param {WeakMap} table  PhysicsHashTable
   * @param {Matter.Pairs} pairs  Matter.js Pairs
   * @description  매 물리시뮬레이터 업데이트마다 충돌하는 모든 리스트를 순회하여 collisionStart 이벤트를 발생시킵니다.
   */
  static onCollisionStart(table, pairs) {
    for (const collision of pairs) {
      const { bodyA, bodyB } = collision
      const A = table.get(bodyA)
      const B = table.get(bodyB)
      A.emit('collisionStart', { another: B })
      B.emit('collisionStart', { another: A })
    }
  }

  /**
   * 
   * @param {WeakMap} table  PhysicsHashTable
   * @param {Matter.Pairs} pairs  Matter.js Pairs
   * @description  매 물리시뮬레이터 업데이트마다 충돌하는 모든 리스트를 순회하여 collisionEnd 이벤트를 발생시킵니다.
   */
  static onCollisionEnd(table, pairs) {
    for (const collision of pairs) {
      const { bodyA, bodyB } = collision
      const A = table.get(bodyA)
      const B = table.get(bodyB)
      A.emit('collisionEnd', { another: B })
      B.emit('collisionEnd', { another: A })
    }
  }


  startPhysicsSimulation() {
    Matter.Runner.run(this.physicsRunner, this.physics)
    Matter.Events.on(this.physicsRunner, 'beforeUpdate', e => Scene.updatePhysicsRender(this.component.children.lists))
    Matter.Events.on(this.physicsWorld, 'createPhysicsBody', e => Scene.appendHashTable(this.physicsTable, e.object, e.body))
    Matter.Events.on(this.physics, 'collisionStart', e => Scene.onCollisionStart(this.physicsTable, e.pairs))
    Matter.Events.on(this.physics, 'collisionEnd', e => Scene.onCollisionEnd(this.physicsTable, e.pairs))
  }

  stopPhysicsSimulation() {
    Matter.Runner.stop(this.physicsRunner)
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

}


export default Scene