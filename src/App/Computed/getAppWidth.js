export default function getAppWidth() {

  return isNaN(this.app.width) ? this.app.width : `${this.app.width}px`
  
}