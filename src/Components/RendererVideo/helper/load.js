export default function load() {

  return this._canplay || new Promise(resolve => {
    Object.defineProperty(this, '_canplay', {
      value: resolve,
      configurable: true,
    })
  })

}