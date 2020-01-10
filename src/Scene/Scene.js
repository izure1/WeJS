import View from '../View/View'
import ComponentFactory from '../View/ComponentFactory/ComponentFactory'

import RESERVATION from '../Components/RESERVATION'


class Scene extends View {

  constructor() {

    super()
    const factory = new ComponentFactory

    this.component.add(factory.create(RESERVATION.PHYSICS_WORLD))
    this.component.add(factory.create(RESERVATION.CHILDREN))

  }

}


export default Scene