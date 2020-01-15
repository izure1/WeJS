<template>
  <div></div>
</template>

<script>
  import AnimationFrame from '../../Utils/AnimationFrame'
  import Searcher from '../../Utils/Searcher'
  import Component from '../../View/Component/Component'

  import onChangeSize from './Methods/onChangeSize'
  import createFixture from './Methods/createFixture'
  import createBody from './Methods/createBody'
  import requestCreateBody from './Methods/requestCreateBody'


  export class Reservation extends Component {

    name = 'physics'
    type = 'dynamic'
    density = 1
    friction = 1
    restitution = 0.3
    fixedRotation = false

    constructor(...args) {
      super(...args)
    }
  }

  export default {
    props: ['scene', 'body'],
    data: () => ({
      updateRequestId: null,
      searcher: new Searcher,
      bodySize: [0, 0],
      object: null,
    }),
    methods: {
      onChangeSize,
      createFixture,
      createBody,
      requestCreateBody,
    },
    created() {
      this.body.on('changesize', this.onChangeSize)
    },
    mounted() {
      this.updateRequestId = AnimationFrame.request((step, deltaTime) => {
        if (!this.object) return
        const pos = this.object.GetPosition()
        const x = pos.get_x()
        const y = pos.get_y()
        const transform = this.body.component.transform
        transform.x = x
        transform.y = y
      })
    },
    beforeDestroy() {
      this.body.off('changesize', this.onChangeSize)
      AnimationFrame.cancelRequest(this.updateRequestId)
    },

    watch: {
      'body.component.physics.density'() {
        this.requestCreateBody()
      },
      'body.component.physics.friction'() {
        this.requestCreateBody()
      },
      'body.component.physics.restitution'() {
        this.requestCreateBody()
      },
      bodySize() {
        this.requestCreateBody()
      }
    }

  }
</script>