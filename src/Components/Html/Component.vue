<template>
  <div v-html="body.component.html.content"></div>
</template>

<script>
  import Component from '../../View/Component/Component'


  export class Reservation extends Component {
    name = 'html'
    content = ''

    constructor(...args) {
      super(...args)
    }
  }

  export default {
    props: ['body']
  }
</script>