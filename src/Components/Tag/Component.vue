<template>
  <div :we-body-tag="body.component.tag.lists.join(' ')"></div>
</template>

<script>
  import Arrayset from '../../Utils/Arrayset'


  export const RESERVATION = () => ({
    name: 'tag',
    lists: new Arrayset,
    
  })

  export default {
    props: ['body'],
    created() {
      this.$set(this.body.component.tag, 'lists', this.body.component.tag.lists)
    }
  }
</script>