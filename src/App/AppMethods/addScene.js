import Scene from '../../Scene/Scene'


export default function addScene(scene) {

  if (!(scene instanceof Scene)) throw 'The scene argument must be Scene instance.'
  this.scenes.add(scene)

}