<template>
  <div v-html="body.component.html.content"></div>
</template>

<script>
  export const RESERVATION = {
    name: 'html',
    content: ''
  }

  export default {
    props: ['body']
  }
</script>