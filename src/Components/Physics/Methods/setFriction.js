export default function setFriction() {

  const { friction, frictionAir, frictionStatic } = this.body.component.physics
  
  this.object.friction = friction
  this.object.frictionAir = frictionAir
  this.object.frictionStatic = frictionStatic

}