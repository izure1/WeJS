export default function updateCollision() {
    for (const { object } of this.particles)
        object.collisionFilter.category = this.collision
}