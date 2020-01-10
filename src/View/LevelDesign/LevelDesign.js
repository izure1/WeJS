class LevelDesign {

  constructor(raw) {
    Object.assign(this, raw)
  }

  set(name, ...args) {
    this[name] = [...args]
  }

  has(name) {
    return this.hasOwnProperty(name)
  }

  get(name) {
    return this[name] || null
  }

}


export default LevelDesign