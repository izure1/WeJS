import Matter from 'matter-js'

import App from './App/App'
import Scene2d from './Scene/Scene2d'
import Scene3d from './Scene/Scene3d'
import View from './View/View'

import Animation from './Animation/Animation'
import AnimationFrame from './Utils/AnimationFrame'
import AssetLoader from './Asset/AssetLoader/AssetLoader'
import Asset from './Asset/Asset/Asset'
import Collider from './Collider/Collider'
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
    AnimationFrame,
    AssetLoader,
    Asset,
    Collider,
    ComponentBuilder,
    ComponentFactory,
    MathUtil,
    Preloader,
    Searcher,
    Sleep,
    UserGestureListener,

    RESERVATION,
    RESERVATION_MAP,
    COMPONENT_MAP,
    
    VERSION,

}