<script>
  export const RESERVATION = () => ({
    name: 'camera',
    x: 0,
    y: 0,
    z: 0,
    rotateZ: 0,
    rotateX: 0,
    rotateY: 0,
    duration: 0,
    delay: 0,
    ease: 'linear',
  })

  export default {
    props: ['body']
  }
</script>