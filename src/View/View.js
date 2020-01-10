import ComponentList from './ComponentList/ComponentList'
import ComponentFactory from './ComponentFactory/ComponentFactory'
import LevelDesign from './LevelDesign/LevelDesign'

import RESERVATION from '../Components/RESERVATION'


class View {

  constructor(raw = {
    id: null,
    level: LevelDesign.PERSISTENT_LEVEL,
    levelDesign: new LevelDesign,
    component: new ComponentList
  }) {

    const {
      id,
      level,
      levelDesign,
      component,
    } = raw

    this.id = id
    this.level = level
    this.levelDesign = levelDesign
    this.component = new ComponentList(component)

    const factory = new ComponentFactory
    this.component.add(factory.create(RESERVATION.CAMERA))
    this.component.add(factory.create(RESERVATION.TRANSFORM))
    this.component.add(factory.create(RESERVATION.FILTER))

  }

}


export default View