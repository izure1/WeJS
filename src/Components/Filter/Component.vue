<script>
  import Component from '../../View/Component/Component'


  export class Reservation extends Component {
    name = 'filter'
    blur = 0
    brightness = 1
    contrast = 1
    grayscale = 0
    invert = 0
    opacity = 1
    saturate = 1
    sepia = 0
    duration = 0
    delay = 0
    backgroundColor = 'transparent'
    ease = 'linear'
    cursor = 'default'

    constructor(...params) {
      super(...params)
    }
  }

  export default {
    props: ['body']
  }
</script>