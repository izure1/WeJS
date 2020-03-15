<template>
  <div :style="{
    backgroundImage: `url(${loader.getUri(body.component.image.src)})`,
    backgroundSize: `
      ${parseImageSize(body.component.image.width)}
      ${parseImageSize(body.component.image.height)}`,
    transition: `
      all
      ${body.component.image.duration}ms
      ${body.component.image.ease}
      ${body.component.image.delay}ms`
  }" class="image-background">
    <img :src="loader.getUri(body.component.image.src)" :style="{ 
      width: parseImageSize(body.component.image.width),
      height: parseImageSize(body.component.image.height),
    }" class="image-fake" />
  </div>
</template>

<script>
  import AssetLoader from '../../Asset/AssetLoader/AssetLoader'
  import Component from '../../View/Component/Component'
  import parseImageSize from './Methods/parseImageSize'

  export class Reservation extends Component {

    name = 'image'
    src = null
    width = 'auto'
    height = 'auto'
    duration = 0
    delay = 0
    ease = 'linear'

    constructor(...params) {
      super(...params)
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