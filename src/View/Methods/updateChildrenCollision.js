export default function updateChildrenCollision(pairs) {

    for (const t of this.body.component.children.lists) 
        t.emit('physics-collision-update', { pairs })

}