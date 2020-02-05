import Definer from '../Utils/Definer'
import Scene from './Scene'
import {
  SCENE_2D
} from './Vars/TYPE'


class Scene2d extends Scene {

  constructor(...args) {
    super(...args)
    Definer
      .create('type', SCENE_2D)
      .seal(true).hidden(false).final(true)
      .to(this)
  }

}


export default Scene2d