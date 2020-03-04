export default function onChangeCollision(e) {

    const { pairs } = e.detail

    if (this.body.component.physics.colliders.has())
    this.setCollider()

}