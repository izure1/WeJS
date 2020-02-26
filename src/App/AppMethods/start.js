import Vue from 'vue'
import Preloader from '../../Utils/Preloader'
import Sleep from '../../Utils/Sleep'
import App from '../App.vue'
import Scene from '../../Scene/Scene3d'


export default async function start(splashScene = new Scene) {
    
    this.app = new Vue({
        el: this.element,
        components: { App },
        template: '<App :scenes="scenes" :app="app" />',
        data: {
            scenes: this.component.children.lists,
            app: this
        }
    })

    this.component.children.lists.clear()
    this.component.children.lists.add(splashScene)

    await Preloader.waitElement(document)
    await Preloader.waitPreloads(this.lifecycle.preload)
    await Preloader.waitPreloads(splashScene.lifecycle.preload)
    await Sleep.wait(100) // app이 Document에 마운트되기를 대기합니다.

    return this.app

}