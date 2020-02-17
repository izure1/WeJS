import Searcher from '../../../Utils/Searcher'

const HOWLER_TO_WORLD = 1 / 20

const CONFIG = {
  coneInnerAngle: 360,
  coneOuterAngle: 360,
  coneOuterGain: 0,
  distanceModel: 'inverse',
  maxDistance: 100,
  rolloffFactor: 1,
  refDistance: 1,
  panningModel: 'HRTF'
}

function getComputedTranslateZ(obj) {
  const transform = getComputedStyle(obj).transform
  const mat = transform.match(/^matrix3d\((.+)\)$/)
  return mat ? ~~(mat[1].split(', ')[14]) : 0
}


export default function observeAudioPosition() {

  this.intervalIndex = setInterval(async () => {

    const el = this.$el
    const app = this.app

    const audio = await this.audio
    if (!app.appElement) return

    const appStyle = getComputedStyle(app.appElement)
    const appRect = app.appElement.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()


    const relX = elRect.x - appRect.x
    const relY = elRect.y - appRect.y
    const centerX = parseFloat(appStyle.width) / 2
    const centerY = parseFloat(appStyle.height) / 2

    let x = relX - centerX
    let y = centerY - relY


    // 현재 객체의 z좌표를 계산하기 위해 객체의 상위 body를 모두 구해 배열에 담습니다.
    let bodys = []
    let body = el
    do {
      body = Searcher.getParentElementFromChildren(body)
      if (!body) break
      bodys.push(body)
    } while (body.classList.contains('we-body'))
    // 이후 body의 z좌표를 누산기로 계산하여 최종 z좌표를 얻어냅니다.
    let z = bodys.reduce((perspAcc, body) => {
      perspAcc -= getComputedTranslateZ(body)
      // 만일 children 컴포넌트로 인해 자식 객체도 존재한다면 카메라의 Z좌표만큼을 추가합니다.
      let camera
      if (camera = body.querySelector('.we-camera')) perspAcc += getComputedTranslateZ(camera)
      return perspAcc
    }, 0)



    x *= HOWLER_TO_WORLD
    y *= HOWLER_TO_WORLD
    z *= HOWLER_TO_WORLD

    audio.pannerAttr(CONFIG)
    audio.orientation(0, 0, 1)
    audio.pos(x, y, z)

  }, this.body.component.audio.recaching)

}