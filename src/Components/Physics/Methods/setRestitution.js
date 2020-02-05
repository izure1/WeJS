export default async function setRestitution() {

  if (this.object) {
    await this.objectReady
    this.object.restitution = this.body.component.physics.restitution
  }

}