import View from '../../View/View'

import Vue from 'vue'
import App from '../App.vue'


export default function launch(scene) {

  if (!(scene instanceof View)) {
    throw 'The scene argument must be View instance.'
  }

  this.destroy()
  this.scene = scene
  this.app = new Vue({
    el: this.element,
    template: '<App :scene="scene" :app="app" />',
    data: {
      scene,
      app: this
    },
    components: {
      App
    }
  })

  return this.app

}