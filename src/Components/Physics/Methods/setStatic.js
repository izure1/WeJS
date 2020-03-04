import Matter from 'matter-js'


export default function setStatic() {

    Matter.Body.setStatic(this.object, this.body.component.physics.isStatic)

}