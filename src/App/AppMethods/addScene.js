import Preloader from '../../Utils/Preloader'
import Scene from '../../Scene/Scene'


export default async function addScene(scene) {

    if (!(scene instanceof Scene)) throw 'The scene argument must be Scene instance.'

    await Preloader.waitPreloads(scene.lifecycle.preload, scene.lifecycle.dataTransfer)
    this.scenes.add(scene)

}