import Matter from 'matter-js'


export default async function setStatic() {

  if (this.object) {
    await this.objectReady
    Matter.Body.setStatic(this.object, this.body.component.physics.static)
  }

}