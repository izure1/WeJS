export default function add(uri, mime) {

  const loader = this.constructor

  if (loader.list.has(uri)) return loader.list.get(uri)
  if (loader.queue.has(uri)) return loader.queue.get(uri)

  loader.queue.set(uri, this.getBuffer(uri, mime))
  return loader.queue.get(uri)

}