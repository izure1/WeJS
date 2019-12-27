export default async function pause() {
  await this.load()
  this._element.pause()
}