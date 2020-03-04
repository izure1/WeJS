import Matter from 'matter-js'

import App from './App/App'
import Scene2d from './Scene/Scene2d'
import Scene3d from './Scene/Scene3d'
import View from './View/View'

import Animation from './Animation/Animation'
import Tick from './Utils/Tick'
import AssetLoader from './Asset/AssetLoader/AssetLoader'
import Asset from './Asset/Asset/Asset'
import ComponentBuilder from './View/ComponentBuilder/ComponentBuilder'
import ComponentFactory from './View/ComponentFactory/ComponentFactory'
import * as MathUtil from './Utils/MathUtil'
import Preloader from './Utils/Preloader'
import Searcher from './Utils/Searcher'
import Sleep from './Utils/Sleep'
import UserGestureListener from  './UserGestureListener/UserGestureListener'

import RESERVATION, { RESERVATION_MAP, COMPONENT_MAP } from './Components/RESERVATION'
import PACKAGE from '../package.json'



const VERSION = PACKAGE.version


export default {

    Matter,

    App,
    Scene2d,
    Scene3d,
    View,

    Animation,
    AssetLoader,
    Asset,
    ComponentBuilder,
    ComponentFactory,
    MathUtil,
    Preloader,
    Searcher,
    Sleep,
    Tick,
    UserGestureListener,

    RESERVATION,
    RESERVATION_MAP,
    COMPONENT_MAP,
    
    VERSION,

}