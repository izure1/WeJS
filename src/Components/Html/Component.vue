<template>
  <div v-html="body.component.html.content"></div>
</template>

<script>
  import Component from '../../WeJSObject/Component/Component'


  export class RESERVATION extends Component {
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