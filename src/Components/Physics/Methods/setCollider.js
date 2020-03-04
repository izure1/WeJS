import Arrayset from '../../../Utils/Arrayset'


export default function setCollider() {

    // 자신의 콜라이더들과 연관된 모든 콜라이더를 배열로 받아와서,
    // collisions.between 으로 계산을 해야합니다.
    if (!this.object) return

    const { colliders } = this.body.component.physics
    // 모든 콜라이더를 추가
    this.scene.physics.collision.between(...colliders)

    // 등록된 콜라이더를 순회하며 관련있는 모든 콜라이더를 받아옵니다.
    const all = this.scene.physics.collision.collisions.OR(...colliders)

    // 관련있는 모든 콜라이더로부터 충돌필터값을 계산합니다.
    this.object.collisionFilter.category = this.scene.physics.collision.between(...all)
    this.wakeAll()

}