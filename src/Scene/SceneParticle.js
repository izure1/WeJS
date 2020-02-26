import Arrayset from '../Utils/Arrayset'
import Definer from '../Utils/Definer'


class SceneParticle {

    constructor(scene) {

        Definer
            .create('scene', scene)
            .seal(true).hidden(true).final(true)
            .to(this)

        this.emitters = new Arrayset

    }

}


export default SceneParticle