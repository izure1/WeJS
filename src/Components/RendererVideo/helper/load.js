export default function load() {

  return new Promise(resolve => {
    Object.defineProperty(this, '_resolve', {
      value: resolve,
      configurable: true,
    })
  })

}