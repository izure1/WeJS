export default function translate() {

  if (!this.$el) return
  
  this.$el.style.transform =  `translate3d(
    ${this.centerPointX}px,
    ${this.centerPointY}px,
    ${-this.body.component.transform.z}px) 
    rotateX(${this.body.component.transform.rotateX}deg)
    rotateY(${-this.body.component.transform.rotateY}deg)
    rotateZ(${this.body.component.transform.rotateZ}deg)
    scale(${this.body.component.transform.scale})`

}