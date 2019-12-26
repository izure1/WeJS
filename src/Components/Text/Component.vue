<template>
  <div :style="{ width: `${textWidth}px`, height: `${textHeight}px` }"></div>
</template>

<script>
  import drawText from './Methods/drawText'


  export const RESERVATION = {
    name: 'text',
    content: '',
    width: 'auto',
    height: 'auto',
    fontSize: 30,
    fontFamily: 'arial',
    fontWeight: 'normal',
    fontStyle: 'normal',
    borderWidth: 0,
    borderColor: 'red',
    color: 'black',
    textAlign: 'left',
    lineHeight: 1,
  }

  export default {
    props: ['body'],
    data: () => ({
      draw: null,
      text: null,
      textWidth: 0,
      textHeight: 0,
    }),
    methods: {
      drawText
    },
    watch: {
      'body.component.text': {
        deep: true,
        handler() {
          this.drawText()
        }
      }
    },
    mounted() {
      this.drawText()
    }
  }
</script>

<style scoped>
  /* .text-svg {
    paint-order: fill stroke;
  } */
</style>