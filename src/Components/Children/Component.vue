<script>
  import Component from '../../WeJSObject/Component/Component'
  import Arrayset from '../../Utils/Arrayset'


  export class RESERVATION extends Component {
    name = 'children'
    lists = new Arrayset

    constructor(...args) {
      super(...args)
    }
  }

  export default {
    props: ['body']
  }
</script>