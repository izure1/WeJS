import ComponentList from './ComponentList/ComponentList'
import ComponentFactory from './ComponentFactory/ComponentFactory'

import RESERVATION from '../Components/RESERVATION'


class View {

  constructor(raw = {
    id: null,
    component: new ComponentList
  }) {

    this.id = raw.id
    this.component = new ComponentList(raw.component)

    const factory = new ComponentFactory
    this.component.add(factory.create(RESERVATION.CAMERA))
    this.component.add(factory.create(RESERVATION.TRANSFORM))
    this.component.add(factory.create(RESERVATION.FILTER))
    
  }

}


export default View