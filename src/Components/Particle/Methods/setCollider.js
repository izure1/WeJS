export default function setCollider() {

    // 모든 콜라이더를 추가
    const { colliders } = this.body.component.particle
    this.scene.physics.collision.between(...colliders)

    // 등록된 콜라이더를 순회하며 관련있는 모든 콜라이더를 받아옵니다.
    const all = this.scene.physics.collision.collisions.OR(...colliders)
    // 관련있는 모든 콜라이더로부터 충돌필터값을 계산합니다.
    this.collision = this.scene.physics.collision.between(...all)

}