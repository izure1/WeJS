<template>
  <div></div>
</template>

<script>
  import Component from '../../View/Component/Component'


  export class Reservation extends Component {

    name = 'physics'
    type = 'dynamic'
    density = 1
    friction = 1
    restitution = 0.3

    constructor(...args) {
      super(...args)
    }
  }

  export default {
    props: ['component', 'app', 'scene', 'body'],
    data: () => ({
      body: null,
    }),
    created(){

    },
    beforeDestroy(){
    },

  }
</script>