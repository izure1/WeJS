export default function _setCanplayPromise() {

  Object.defineProperty(this, '_canplayPromise', {
    value: new Promise(resolve => {
      Object.defineProperty(this, '_canplayResolve', {
        value: resolve
      })
    })
  })

}