
import Matter from 'matter-js'


export default async function setDensity() {

  await this.objectReady
  Matter.Body.setDensity(this.object, this.body.component.physics.density)

}