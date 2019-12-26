<template>
  <div>
    <video :src="body.component.rendererVideo.src" :width="body.component.rendererVideo.width"
      :height="body.component.rendererVideo.height" :controls="body.component.rendererVideo.controls"
      :loop="body.component.rendererVideo.loop" :autoplay="body.component.rendererVideo.autoplay"
      :muted="body.component.rendererVideo.muted" />
  </div>
</template>

<script>
  export const RESERVATION = {
    name: 'renderer-video',
    src: null,
    width: 'auto',
    height: 'auto',
    controls: false,
    loop: false,
    autoplay: false,
    muted: false,
  }

  export default {
    props: ['body']
  }
</script>