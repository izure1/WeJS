import Scene from '../../Scene/Scene'


export default function dropScene(scene) {

  if (!(scene instanceof Scene)) throw 'The scene argument must be Scene instance.'
  this.scenes.delete(scene)

}