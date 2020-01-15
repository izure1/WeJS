<template>
  <div></div>
</template>

<script>
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
    beforeDestroy() {
      this.body.off('changesize', this.onChangeSize)
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