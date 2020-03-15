<script>
  import Component from '../../View/Component/Component'
  import Arrayset from '../../Utils/Arrayset'


  export class Reservation extends Component {
    name = 'children'
    lists = new Arrayset

    constructor(...params) {
      super(...params)
    }
  }

  export default {
    props: ['body']
  }
</script>