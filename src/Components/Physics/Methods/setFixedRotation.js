import Matter from 'matter-js'


export default function setFixedRotation() {

  if (this.body.component.physics.fixedRotation) {
    this.inertia = this.object.inertia
    Matter.Body.setInertia(this.object, Infinity)
  }
  else 
    Matter.Body.setInertia(this.object, this.inertia)

}