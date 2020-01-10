import App from './App/App'
import Scene from './Scene/Scene'
import View from './View/View'

import Animation from './Animation/Animation'
import AssetLoader from './Asset/AssetLoader/AssetLoader'
import Asset from './Asset/Asset/Asset'
import ComponentBuilder from './View/ComponentBuilder/ComponentBuilder'
import ComponentFactory from './View/ComponentFactory/ComponentFactory'
import Searcher from './Utils/Searcher'

import RESERVATION, {
  RESERVATION_MAP,
  COMPONENT_MAP,
} from './Components/RESERVATION'
import PACKAGE from '../package.json'



const VERSION = PACKAGE.version


export default {

  App,
  Scene,
  View,

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