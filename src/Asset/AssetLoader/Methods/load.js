export default async function load() {

  const loader = this.constructor

  for await (const [key, asset] of loader.queue.values()) {
    loader.list.set(key, asset)
  }

  return this.assets

}