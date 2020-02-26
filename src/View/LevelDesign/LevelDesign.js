class LevelDesign {

  static PERSISTENT_LEVEL = 'main'

  set(name, levels = []) {
    this[name] = [...levels]
  }

  has(name) {
    return this.hasOwnProperty(name)
  }

  get(name) {
    return this[name] || null
  }

  _getRequired(name, _lists) {
    if (_lists.has(name)) return _lists
    _lists.add(name)
    if (!this.has(name)) return _lists
    for (const level of this.get(name)) this._getRequired(level, _lists)
    return _lists
  }

  getRequired(name, _lists = new Set) {
    return Array.from(this._getRequired(name, new Set)).sort()
  }

}


export default LevelDesign