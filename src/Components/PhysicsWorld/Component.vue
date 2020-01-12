<template>
  <div></div>
</template>

<script>
  import Component from '../../View/Component/Component'
  import Box2D from '../../External/Box2D/Box2D'
  //import CONFIG from './Vars/CONFIG'

  import createWorld from './Methods/createWorld'
  import destroyWorld from './Methods/destroyWorld'
  import getGravity from './Methods/getGravity'
  import setGravity from './Methods/setGravity'

  import gravityX from './Watch/gravityX'
  import gravityY from './Watch/gravityY'


  export class Reservation extends Component {
    name = 'physics-world'
    gravityX = 0
    gravityY = -9.8

    constructor(...args) {
      super(...args)
    }
  }

  export default {

    data: () => ({
      //box2d: Box2D(CONFIG),
      world: null
    }),
    props: ['body'],
    methods: {
      createWorld,
      destroyWorld,
      getGravity,
      setGravity,
    },

    created() {
      this.createWorld()
    },
    beforeDestroy() {
      this.destroyWorld()
    },

    watch: {
      gravityX,
      gravityY,
    }

  }
</script>