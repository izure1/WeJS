<script>
  import Animation from './Animation.js'


  export const RESERVATION = {
    name: 'animation',
    set(name) {
      this[name] = new Animation
    },
    bind(component, target) {

    },
    start(after, duration, ease) {
      
    },
  }

  export default {
    props: ['body']
  }
</script>