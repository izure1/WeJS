<template>
  <div :we-body-tag="body.component.tag.lists.join(' ')"></div>
</template>

<script>
  import Component from '../../View/Component/Component'
  import Arrayset from '../../Utils/Arrayset'


  export class Reservation extends Component {
    name = 'tag'
    lists = new Arrayset

    constructor(...args) {
      super(...args)
    }
  }

  export default {
    props: ['body']
  }
</script>