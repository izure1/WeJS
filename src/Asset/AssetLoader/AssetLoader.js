import add from './Methods/add'
import addFromArray from './Methods/addFromArray'
import getBuffer from './Methods/getBuffer'
import load from './Methods/load'


/**
 * 
 * @description
 * 한번 로드된 에셋은 다른 씬에서 다시 사용될 가능성이 있기 때문에, 로드된 에셋은 AssetLoader 인스턴스 안에 저장되지 않고, static 변수 안에 저장됩니다.
 * 이후 메서드로 호출할 경우, 싱글톤 AssetLoader 에서 해당하는 에셋을 반환합니다.
 * 
 */
class AssetLoader {

  static _list = new Map
  static _queue = new Map

  static get list() {
    return AssetLoader._list
  }
  static get queue() {
    return AssetLoader._queue
  }
  static getUri(uri) {
      const asset = AssetLoader.list.get(uri)
      return asset ? asset.uri : uri
  }

  get list() {
    return AssetLoader.list
  }
  get queue() {
    return AssetLoader.queue
  }
  get assets() {
    return Array.from(this.list.values())
  }

  getUri(uri) {
      return AssetLoader.getUri(uri)
  }

}

AssetLoader.prototype.add = add
AssetLoader.prototype.addFromArray = addFromArray
AssetLoader.prototype.getBuffer = getBuffer
AssetLoader.prototype.load = load


export default AssetLoader