export default function _setCanplayPromise() {

  this._canplayPromise = new Promise(resolve => {
    this._canplayResolve = resolve
  })

}