import App from './App/App'
import Scene from './Scene/Scene'
import WeJSObject from './WeJSObject/WeJSObject'

import Animation from './Animation/Animation'
import AssetLoader from './Asset/AssetLoader/AssetLoader'
import Asset from './Asset/Asset/Asset'
import ComponentBuilder from './WeJSObject/ComponentBuilder/ComponentBuilder'
import ComponentFactory from './WeJSObject/ComponentFactory/ComponentFactory'
import Searcher from './Searcher/Searcher'

import RESERVATION, {
  RESERVATION_MAP,
  COMPONENT_MAP,
} from './Components/RESERVATION'
import PACKAGE from '../package.json'



const VERSION = PACKAGE.version


export default {

  App,
  Scene,
  WeJSObject,

  Animation,
  AssetLoader,
  Asset,
  ComponentBuilder,
  ComponentFactory,
  Searcher,

  RESERVATION,
  RESERVATION_MAP,
  COMPONENT_MAP,
  
  VERSION,

}