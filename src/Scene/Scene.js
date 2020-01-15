import Box2D from '../External/Box2D/Box2D'
import PHYSICS_CONFIG from './Vars/PHYSICS_CONFIG'

import AnimationFrame from '../Utils/AnimationFrame'
import Definer from '../Utils/Definer'
import View from '../View/View'
import ComponentFactory from '../View/ComponentFactory/ComponentFactory'

import RESERVATION from '../Components/RESERVATION'


class Scene extends View {

  constructor() {

    super()
    this.gravityX = 0
    this.gravityY = -9.8

    /*
     *  씬 객체는 내부적으로 컴포넌트가 아닌, 물리 세계(physics-world)를 가지고 있습니다.
     *  씬의 children 컴포넌트로 추가된 하위 객체들은, physics 컴포넌트로 물리효과를 만들 시 물리 세계를 참조합니다.
     *  Ex) scene.physicsWorld.yourJob
     * 
     *  씬의 물리세계는 수정하거나 파괴할 수 없습니다.
     * 
     */

    // 물리 객체 만들기
    Definer
      .create('physics', Box2D(PHYSICS_CONFIG))
      .seal(true).hidden(true).final(true)
      .to(this)

    // 물리 세계 만들기
    Definer
      .create('physicsWorld', new this.physics.b2World(this.gravity, false))
      .seal(true).hidden(true).final(true)
      .to(this)

    // 물리 업데이트 시간 만들기
    Definer
      .create('physicsInterval', 1000 / 60)
      .seal(true).hidden(false).final(false)
      .to(this)

    const factory = new ComponentFactory
    this.component.add(factory.create(RESERVATION.CHILDREN))

    // 물리 업데이트를 실행합니다.
    this.startPhysicsSimulation()

  }

  get gravity() {
    return new this.physics.b2Vec2(this.gravityX, this.gravityY)
  }

  startPhysicsSimulation() {

    const id = AnimationFrame.request((step, deltaTime) => {
      this.updatePhysicsSimulation()
    })

    Definer
      .create('physicsId', id)
      .seal(true).hidden(true).final(true)
      .to(this)

  }

  updatePhysicsSimulation() {
    this.physicsWorld.ClearForces()
    this.physicsWorld.Step(this.physicsInterval)
  }

  stopPhysicsSimulation() {
    AnimationFrame.cancelRequest(this.physicsId)
  }

}


export default Scene