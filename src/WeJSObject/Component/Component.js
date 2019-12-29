import Vue from 'vue'


class Component {

  static getNonEnumProps(obj) {
    const alls = Object.getOwnPropertyNames(obj)
    const enums = Object.keys(obj)
    return alls.filter(t => enums.indexOf(t) === -1)
  }

  constructor(info) {
    this.name = null
    Object.getOwnPropertyNames(info).forEach(property => {
      const value = info[property]
      this[property] = value && value.call ? value.bind(this) : Vue.set(this, property, value)
    })
  }

}


export default Component