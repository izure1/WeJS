<script>
  import Component from '../../WeJSObject/Component/Component'


  export class Reservation extends Component {

    name = 'camera'
    x = 0
    y = 0
    z = 0
    rotateZ = 0
    rotateX = 0
    rotateY = 0
    duration = 0
    delay = 0
    ease = 'linear'

    constructor(...args) {
      super(...args)
    }
  }

  export default {
    props: ['body']
  }
</script>