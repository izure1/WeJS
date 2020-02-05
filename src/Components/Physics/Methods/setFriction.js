export default async function setFriction() {

  if (this.object) {
    await this.objectReady
    this.object.friction = this.body.component.physics.friction
    this.object.frictionAir = this.body.component.physics.frictionAir
    this.object.frictionStatic = this.body.component.physics.frictionStatic
  }

}