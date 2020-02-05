export default function emit(event) {

  this.body.emit(event.type, event)

}