export default async function pause() {
  await this.load()
  return this.element.pause()
}