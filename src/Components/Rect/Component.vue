<template>
  <div :style="{
    width: `${this.body.component.rect.width}px`,
    height: `${this.body.component.rect.height}px`,
    borderWidth: `${this.body.component.rect.borderWidth}px`,
    backgroundColor: this.body.component.rect.color,
    borderColor: this.body.component.rect.borderColor,
  }"></div>
</template>

<script>
  import Component from '../../View/Component/Component'


  export class Reservation extends Component {

    name = 'rect'
    width = 100
    height = 100
    borderWidth = 0
    borderColor = 'black'
    color = 'red'

    constructor(...params) {
      super(...params)
    }
  }
  export default {
    props: ['body']
  }
</script>

<style lang="scss" scoped>

</style>