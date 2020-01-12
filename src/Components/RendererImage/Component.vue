<template>
  <div :style="{
    backgroundImage: `url(${loader.getUri(body.component.rendererImage.src)})`,
    backgroundSize: `
      ${parseImageSize(body.component.rendererImage.width)}
      ${parseImageSize(body.component.rendererImage.height)}`,
    transition: `
      all
      ${body.component.rendererImage.duration}ms
      ${body.component.rendererImage.ease}
      ${body.component.rendererImage.delay}ms`
  }" class="image-background">
    <img :src="loader.getUri(body.component.rendererImage.src)" :style="{ 
      width: parseImageSize(body.component.rendererImage.width),
      height: parseImageSize(body.component.rendererImage.height),
    }" class="image-fake" />
  </div>
</template>

<script>
  import AssetLoader from '../../Asset/AssetLoader/AssetLoader'
  import Component from '../../View/Component/Component'
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
    data: () => ({
      loader: new AssetLoader
    }),
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