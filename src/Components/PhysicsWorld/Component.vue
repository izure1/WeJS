<template>
  <div></div>
</template>

<script>
  import Box2D from '../../External/Box2D/Box2D'
  import CONFIG from './Vars/CONFIG'

  import createWorld from './Methods/createWorld'
  import getGravity from './Methods/getGravity'
  import setGravity from './Methods/setGravity'

  import gravityX from './Watch/gravityX'
  import gravityY from './Watch/gravityY'


  export const RESERVATION = {
    name: 'physics-world',
    gravityX: 0,
    gravityY: -9.8,
  }

  export default {

    data: () => ({
      box2d: Box2D(CONFIG),
      world: null
    }),
    props: ['body'],
    methods: {
      createWorld,
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