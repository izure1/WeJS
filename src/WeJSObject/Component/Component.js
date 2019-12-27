import Vue from 'vue'


class Component {

  constructor(info) {
    this.name = null
    for (let i in info) {
      const value = info[i]
      this[i] = value && value.call ? value.bind(this) : Vue.set(this, i, value)
    }
  }

}


export default Component