import {
  Angler
} from '../../../Utils/MathUtil'


const angler = new Angler

export default async function transformObject() {

  if (this.object && this.tracking) {

    await this.objectReady

    const {
      x,
      y,
      rotateZ,
    } = this.body.component.transform
    
    this.object.position.x = x
    this.object.position.y = -y
    this.object.angle = angler.fromDegree(rotateZ).radian

  }

}