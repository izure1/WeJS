import AssetLoader from '../../../Asset/AssetLoader/AssetLoader'


export default function blobUri() {

  const src = this.body.component.rendererImage.src
  const loader = new AssetLoader

  return loader.list.has(src) ? loader.list.get(src).uri : src
  
}