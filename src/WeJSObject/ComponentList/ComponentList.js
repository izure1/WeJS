import Vue from 'vue'


class ComponentList {

  constructor(raw = {}) {
    for (let i in raw) this[i] = raw[i]
  }

  add(component) {
    this[component.name] = Vue.set(this, component.name, component)
  }

}


export default ComponentList