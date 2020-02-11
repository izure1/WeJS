import Matter from 'matter-js'
import { Angler } from '../../../Utils/MathUtil'


const angler = new Angler

export default function transform() {
    
    if (this.tracking) {
    
        const { x, y, rotateZ } = this.body.component.transform

        const vector = Matter.Vector.create(x, -y)
        const angle = angler.fromDegree(rotateZ).radian
        
        Matter.Body.setPosition(this.object, vector)
        Matter.Body.setAngle(this.object, angle)

    }

}