import Matter from 'matter-js'
import { Angle } from '../../../Utils/MathUtil'


export default function transform() {
    
    if (this.tracking && this.object) {
    
        const { x, y, rotateZ, scale } = this.body.component.transform

        const vector = Matter.Vector.create(x, -y)
        const angle = Angle.degreeToRadian(rotateZ)

        const calced = scale / this.scale
        this.scale = scale
        
        Matter.Body.setPosition(this.object, vector)
        Matter.Body.setAngle(this.object, angle)
        Matter.Body.scale(this.object, calced, calced)

    }

}