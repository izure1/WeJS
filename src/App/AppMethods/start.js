import Vue from 'vue'
import Preloader from '../../Utils/Preloader'
import App from '../App.vue'
import Scene from '../../Scene/Scene3d'


export default async function start(splashScene = new Scene) {
    
    this.app = new Vue({
        el: this.element,
        components: { App },
        template: '<App :scenes="scenes" :app="app" />',
        data: {
            scenes: this.scenes,
            app: this
        }
    })

    this.scenes.clear()
    this.scenes.add(splashScene)

    await Preloader.waitPreloads(this.preload)

    return this.app

}