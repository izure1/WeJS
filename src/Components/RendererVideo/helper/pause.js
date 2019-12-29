export default async function pause() {
  await this.waitLoading()
  return this.element.pause()
}