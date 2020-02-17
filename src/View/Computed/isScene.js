import Scene from '../../Scene/Scene'


export default function isScene() {
    return this.body instanceof Scene
}