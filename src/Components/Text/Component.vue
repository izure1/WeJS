<template>
  <div :style="{ width: `${textWidth}px`, height: `${textHeight}px` }"></div>
</template>

<script>
  import Component from '../../View/Component/Component'

  import drawText from './Methods/drawText'


  export class Reservation extends Component {
    name = 'text'
    content = ''
    width = 'auto'
    height = 'auto'
    fontSize = 30
    fontFamily = 'arial'
    fontWeight = 'normal'
    fontStyle = 'normal'
    borderWidth = 0
    borderColor = 'red'
    color = 'black'
    textAlign = 'left'
    lineHeight = 1

    constructor(...args) {
      super(...args)
    }
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