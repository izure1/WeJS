import { Angle } from '../../../Utils/MathUtil'


export default function translate() {
    
    if (!this.object) return

    const { x, y } = this.object.position
    const { transform } = this.body.component
  
    this.tracking = false
    transform.x = x
    transform.y = -y
    transform.rotateZ = Angle.radianToDegree(this.object.angle)
    this.$nextTick(() => { this.tracking = true })

}