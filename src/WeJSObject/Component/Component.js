import Vue from 'vue'


class Component {

  constructor(info) {
    this.name = null
    Object.getOwnPropertyNames(info).forEach(property => {
      const value = info[property]
      this[property] = value && value.call ? value.bind(this) : Vue.set(this, property, value)
    })
  }

}


export default Component