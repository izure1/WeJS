<script>
  import play from './Helper/play'
  import pause from './Helper/pause'


  export const RESERVATION = () => ({

    src: null,

    play,
    pause,

  })

  export default {

    props: ['body'],
    data: () => ({
      audio: null,
    }),

  }
</script>