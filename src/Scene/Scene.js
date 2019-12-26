import WeJSObject from '../WeJSObject/WeJSObject'
import ComponentFactory from '../WeJSObject/ComponentFactory/ComponentFactory'

import RESERVATION from '../Components/RESERVATION'


class Scene extends WeJSObject {

  constructor() {

    super()
    const factory = new ComponentFactory

    this.component.add(factory.create(RESERVATION.PHYSICS_WORLD))
    this.component.add(factory.create(RESERVATION.CHILDREN))

  }

}


export default Scene