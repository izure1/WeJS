<template>
  <div :style="{
    backgroundImage: `url(${blobUri})`,
    backgroundSize: `
      ${parseImageSize(body.component.rendererImage.width)}
      ${parseImageSize(body.component.rendererImage.height)}`,
    transition: `
      all
      ${body.component.rendererImage.duration}ms
      ${body.component.rendererImage.ease}
      ${body.component.rendererImage.delay}ms`
  }" class="image-background">
    <img :src="blobUri" :style="{ 
      width: parseImageSize(body.component.rendererImage.width),
      height: parseImageSize(body.component.rendererImage.height),
    }" class="image-fake" />
  </div>
</template>

<script>
  import Component from '../../View/Component/Component'
  import blobUri from './Computed/blobUri'
  import parseImageSize from './Methods/parseImageSize'

  export class Reservation extends Component {

    name = 'renderer-image'
    src = null
    width = 'auto'
    height = 'auto'
    duration = 0
    delay = 0
    ease = 'linear'

    constructor(...args) {
      super(...args)
    }
  }

  export default {
    props: ['body'],
    computed: {
      blobUri
    },
    methods: {
      parseImageSize
    }
  }
</script>

<style scoped>
  .image-fake {
    visibility: hidden;
  }
</style>