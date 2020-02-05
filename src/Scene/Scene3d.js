import Definer from '../Utils/Definer'
import Scene from './Scene'
import {
  SCENE_3D
} from './Vars/TYPE'


class Scene3d extends Scene {

  constructor(...args) {
    super(...args)
    Definer
      .create('type', SCENE_3D)
      .seal(true).hidden(false).final(true)
      .to(this)
  }

}


export default Scene3d