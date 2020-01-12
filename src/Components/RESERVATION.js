/**
 * 
 * View 내부에서 사용될 모든 컨포넌트의 목록을 선언합니다.
 * 
 * 이곳에서 컨포넌트를 관리하면 라이브러리 전역에서 일일이 컨포넌트를 추가할 필요가 없어집니다.
 * 컨포넌트는 아래에 MAP에서 관리하십시오.
 * 
 */
import COMPONENT_CAMERA, {
  Reservation as CAMERA
} from './Camera/Component.vue'
import COMPONENT_TRANSFORM, {
  Reservation as TRANSFORM
} from './Transform/Component.vue'
import COMPONENT_FILTER, {
  Reservation as FILTER
} from './Filter/Component'
import COMPONENT_CHILDREN, {
  Reservation as CHILDREN
} from './Children/Component.vue'
import COMPONENT_PHYSICS, {
  Reservation as PHYSICS
} from './Physics/Component.vue'
import COMPONENT_TEXT, {
  Reservation as TEXT
} from './Text/Component.vue'
import COMPONENT_HTML, {
  Reservation as HTML
} from './Html/Component.vue'
import COMPONENT_RENDERER_IMAGE, {
  Reservation as RENDERER_IMAGE
} from './RendererImage/Component.vue'
import COMPONENT_RENDERER_VIDEO, {
  Reservation as RENDERER_VIDEO
} from './RendererVideo/Component.vue'
import COMPONENT_DATASET, {
  Reservation as DATASET
} from './Dataset/Component.vue'
import COMPONENT_TAG, {
  Reservation as TAG
} from './Tag/Component.vue'
import COMPONENT_AUDIO, {
  Reservation as AUDIO
} from './Audio/Component.vue'



const PACKAGES = [

  {
    name: (new CAMERA).name,
    reservation: CAMERA,
    component: COMPONENT_CAMERA,
  },

  {
    name: (new TRANSFORM).name,
    reservation: TRANSFORM,
    component: COMPONENT_TRANSFORM,
  },

  {
    name: (new FILTER).name,
    reservation: FILTER,
    component: COMPONENT_FILTER,
  },

  {
    name: (new CHILDREN).name,
    reservation: CHILDREN,
    component: COMPONENT_CHILDREN,
  },

  {
    name: (new PHYSICS).name,
    reservation: PHYSICS,
    component: COMPONENT_PHYSICS,
  },

  {
    name: (new TEXT).name,
    reservation: TEXT,
    component: COMPONENT_TEXT,
  },

  {
    name: (new HTML).name,
    reservation: HTML,
    component: COMPONENT_HTML,
  },

  {
    name: (new RENDERER_IMAGE).name,
    reservation: RENDERER_IMAGE,
    component: COMPONENT_RENDERER_IMAGE,
  },

  {
    name: (new RENDERER_VIDEO).name,
    reservation: RENDERER_VIDEO,
    component: COMPONENT_RENDERER_VIDEO,
  },

  {
    name: (new DATASET).name,
    reservation: DATASET,
    component: COMPONENT_DATASET,
  },

  {
    name: (new TAG).name,
    reservation: TAG,
    component: COMPONENT_TAG,
  },

  {
    name: (new AUDIO).name,
    reservation: AUDIO,
    component: COMPONENT_AUDIO,
  },

]


// Map 자료형의 방식으로 받고 싶다면, import { MAP as 변수명 } 의 방식을 이용하십시오.
const RESERVATION_MAP = (() => {

  const map = PACKAGES.map(({
    name,
    reservation,
  }) => [name, reservation])
  return new Map(map)

})()


// Map 자로형의 Vue 컴포넌트를 받고 싶다면, import { COMPONENT as 변수명 } 의 방식을 이용하십시오.
const COMPONENT_MAP = (() => {

  const map = PACKAGES.map(({
    name,
    component,
  }) => [name, component])
  return new Map(map)

})()


// JSON 자료형의 방식으로 받고 싶다면, default 방식으로 사용하면 됩니다. import 변수명
const DEFAULT_JSON = (() => {

  const toUpperCase = key => key.toUpperCase().replace(/\-/g, '_')
  const ret = {}

  for (const {
      name,
      reservation
    } of PACKAGES) ret[toUpperCase(name)] = reservation

  return ret

})()


export default DEFAULT_JSON
export {
  PACKAGES,
  RESERVATION_MAP,
  COMPONENT_MAP,
}