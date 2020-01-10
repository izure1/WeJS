<template>
  <div></div>
</template>

<script>
  import Component from '../../View/Component/Component'


  export class Reservation extends Component {
    name = 'physics'

    constructor(...args) {
      super(...args)
    }
  }

  export default {
    props: ['component'],
  }
</script>