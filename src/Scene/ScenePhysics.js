import Matter from 'matter-js'
import Arrayset from '../Utils/Arrayset'


class ScenePhysics {
  
    table = null
    runner = null
    engine = null
    world = null
    lists = null

    /**
     * 
     * @param {Arrayset|Array} lists  업데이트할 물리객체의 목록을 담은 배열이거나, 유사배열입니다.
     */
    static updateRender(lists) {
        for (const body of lists) {
            if (body.component.physics &&
                body.component.physics.vue)
                body.component.physics.vue.update()
        }
    }

    /**
     * 
     * @param {WeakMap} table  PhysicsHashTable
     * @param {Matter.Composite} object  Matter.js Pairs
     * @param {View} body  WeJS.View
     * @description  물리시뮬레이터 해쉬테이블에 물리객체와 View 객체를 키와 값의 쌍으로 삽입합니다.
     */
    static addObjectToTable(table, object, body) {
        table.set(object, body)
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

    constructor(lists = new Arrayset) {
        this.lists = lists
    }

    init() {

        if (this.runner)
            Matter.Runner.stop(this.runner)

        this.runner = Matter.Runner.create()
        this.engine = Matter.Engine.create()
        this.world = this.engine.world
        this.table = new WeakMap

        this.world.gravity.y = 0.98

    }

    start() {
        Matter.Runner.run(this.runner, this.engine)
        Matter.Events.on(this.runner, 'afterUpdate', e => ScenePhysics.updateRender(this.lists))
        Matter.Events.on(this.world, 'createPhysicsBody', e => ScenePhysics.addObjectToTable(this.table, e.object, e.body))
        Matter.Events.on(this.engine, 'collisionStart', e => ScenePhysics.onCollisionStart(this.table, e.pairs))
        Matter.Events.on(this.engine, 'collisionEnd', e => ScenePhysics.onCollisionEnd(this.table, e.pairs))
    }

    stop() {
        Matter.Runner.stop(this.runner)
    }

}

export default ScenePhysics