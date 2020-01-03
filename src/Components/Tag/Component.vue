<template>
  <div :we-body-tag="body.component.tag.lists.join(' ')"></div>
</template>

<script>
  import Component from '../../WeJSObject/Component/Component'
  import Arrayset from '../../Utils/Arrayset'


  export class RESERVATION extends Component {
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