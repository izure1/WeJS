export default async function launch(...s) {

    this.component.children.lists.clear()

    const scenes = [...s]
    const scenesDones = []
    
    for (const scene of scenes)
        scenesDones.push(this.addScene(scene))

    await Promise.all(scenesDones)
    return this.app

}