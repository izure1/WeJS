import {
  Angler
} from '../../../Utils/MathUtil'


const angler = new Angler

export default async function translateObject() {

  if (this.object) {

    await this.objectReady
  
    const { x, y } = this.object.position
    const transform = this.body.component.transform
    this.tracking = false
    transform.x = x
    transform.y = -y
    transform.rotateZ = angler.fromRadian(this.object.angle).angle
    this.tracking = true
    
  }

}