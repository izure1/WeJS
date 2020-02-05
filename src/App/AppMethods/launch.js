import Scene from '../../Scene/Scene'

import Vue from 'vue'
import App from '../App.vue'


export default function launch(scenes) {

  this.destroy()

  if (!Array.isArray(scenes)) scenes = [scenes]
  for (const scene of scenes) this.addScene(scene)

  
  this.app = new Vue({
    el: this.element,
    template: '<App :scenes="scenes" :app="app" />',
    data: {
      scenes: this.scenes,
      app: this
    },
    components: {
      App
    }
  })

  return this.app

}