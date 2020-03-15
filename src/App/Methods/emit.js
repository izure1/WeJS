export default function emit(e) {
    this.app.emit(e.type)
}