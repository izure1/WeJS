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
    isStatic = false
    isSender = false
    fixedRotation = false
    colliders = new Arrayset

    constructor(...args) {
      super(...args)
    }

    async applyForce(x, y) {
      Matter.Body.applyForce(await this.vue.object, Matter.Vector.create(x, y))
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
    }),
    tracking: true,
    methods: {
      onChangeSize,
      destroyBody,
      requestCreateBody,
      setStatic,
      setFriction,
      setRestitution,
      setFixedRotation,
      update,
      translateObject,
      transformObject,
    },
    created() {

      this.body.on('changesize', this.onChangeSize)
      this.body.component.physics.setVue(this)

    },
    beforeDestroy() {
      this.destroyBody()
      this.body.component.physics.destroy()
      this.body.off('changesize', this.onChangeSize)
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