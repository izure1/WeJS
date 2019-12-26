<template>
  <section class="we-viewport" :style="{ 
    width: getAppWidth,
    height: getAppHeight,
    backgroundColor: app.backgroundColor,
    borderColor: app.borderColor,
    borderWidth: `${app.borderWidth}px`,
    perspective: `${app.perspective}px`,
  }">
    <we-body :body="scene" />
  </section>
</template>

<script>
  import WeBody from '../WeJSObject/WeJSObject.vue'

  import getAppWidth from './Computed/getAppWidth'
  import getAppHeight from './Computed/getAppHeight'

  export default {

    components: {
      WeBody
    },
    props: ['scene', 'app'],
    computed: {
      getAppWidth,
      getAppHeight,
    }

  }
</script>

<style scoped>
  .we-viewport {
    position: relative;
    overflow: hidden;
    user-select: none;
    border-style: solid;
  }
</style>