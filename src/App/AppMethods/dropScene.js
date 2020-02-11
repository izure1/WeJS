import Scene from '../../Scene/Scene'


export default async function dropScene(scene) {

  if (!(scene instanceof Scene)) throw 'The scene argument must be Scene instance.'
  this.scenes.delete(scene)

}