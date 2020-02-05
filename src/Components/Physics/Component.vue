<template>
  <div></div>
</template>

<script>
  import Matter from 'matter-js'
  import Searcher from '../../Utils/Searcher'
  import Arrayset from '../../Utils/Arrayset'
  import Component from '../../View/Component/Component'

  import onChangeSize from './Methods/onChangeSize'
  import destroyBody from './Methods/destroyBody'
  import requestCreateBody from './Methods/requestCreateBody'
  import setStatic from './Methods/setStatic'
  import setDensity from './Methods/setDensity'
  import setFriction from './Methods/setFriction'
  import setRestitution from './Methods/setRestitution'
  import setFixedRotation from './Methods/setFixedRotation'
  import update from './Methods/update'
  import translateObject from './Methods/translateObject'
  import transformObject from './Methods/transformObject'


  export class Reservation extends Component {

    name = 'physics'
    friction = 1
    frictionAir = 0.01
    frictionStatic = 0.5
    restitution = 0.3
    static = false
    fixedRotation = false
    colliders = new Arrayset

    constructor(...args) {
      super(...args)
    }

    applyForce(x, y) {
      Matter.Body.applyForce()
    }
  }

  export default {
    props: ['scene', 'body'],
    data: () => ({
      updateRequestId: null,
      searcher: new Searcher,
      bodySize: [0, 0],
      inertia: 0,
      object: null,
      objectReady: null,
      setObjectReady: null,
    }),
    tracking: true,
    methods: {
      onChangeSize,
      destroyBody,
      requestCreateBody,
      setStatic,
      setDensity,
      setFriction,
      setRestitution,
      setFixedRotation,
      update,
      translateObject,
      transformObject,
    },
    created() {
      this.body.on('changesize', this.onChangeSize)
      this.objectPromise = new Promise(resolve => {
        this.setObjectReady = resolve
      })
    },
    mounted() {
      // 매 프레임마다 물리객체 좌표를 렌더러에 반영합니다.
      Matter.Events.on(this.scene.physicsRunner, 'afterUpdate', this.update)
    },
    beforeDestroy() {
      this.destroyBody()
      this.body.off('changesize', this.onChangeSize)
      Matter.Events.off(this.scene.physicsRunner, 'afterUpdate', this.update)
    },

    watch: {
      // transform을 직접 수정할 경우, 물리를 추적하지 않습니다.
      'body.component.transform.x'() {
        this.transformObject()
      },
      'body.component.transform.y'() {
        this.transformObject()
      },
      'body.component.transform.rotateZ'() {
        this.transformObject()
      },
      'body.component.physics.type'() {
        this.setStatic()
      },
      'body.component.physics.density'() {
        this.setDensity()
      },
      'body.component.physics.friction'() {
        this.setFriction()
      },
      'body.component.physics.frictionAir'() {
        this.setFriction()
      },
      'bpdy.component.physics.frictionStatic'() {
        this.setFriction()
      },
      'body.component.physics.restitution'() {
        this.setRestitution()
      },
      'body.component.physics.fixedRotation'() {
        this.setFixedRotation()
      },
      'bodySize'() {
        this.requestCreateBody()
      }
    }

  }
</script>