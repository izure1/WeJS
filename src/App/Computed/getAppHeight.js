export default function getAppHeight() {

  return isNaN(this.app.height) ? this.app.height : `${this.app.height}px`
  
}