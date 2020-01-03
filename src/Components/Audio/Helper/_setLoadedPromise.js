export default function _setAudioPromise() {

  this._loadedPromise = new Promise((resolve, reject) => {
    this._loadedResolve = resolve
    this._loadedReject = reject
  })

}