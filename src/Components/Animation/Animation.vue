<script>
  import Component from '../../View/Component/Component'
  import Animation from './Animation.js'


  export class Reservation extends Component {

    name = 'animation'

    set(name) {
      this[name] = new Animation
    }

    bind(component, target) {}
    start(after, duration, ease) {}

    constructor(...params) {
      super(...params)
    }
  }

  export default {
    props: ['body']
  }
</script>