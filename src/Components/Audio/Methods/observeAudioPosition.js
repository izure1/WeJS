import Searcher from '../../../Utils/Searcher'


const CONFIG = {
  coneInnerAngle: 360,
  coneOuterAngle: 360,
  coneOuterGain: 0,
  distanceModel: 'inverse',
  maxDistance: 10000,
  rolloffFactor: 1,
  refDistance: 100,
  panningModel: 'HRTF'
}

function getComputedTranslateZ(obj) {
  const transform = getComputedStyle(obj).transform
  const mat = transform.match(/^matrix3d\((.+)\)$/)
  return mat ? ~~(mat[1].split(', ')[14]) : 0
}


export default function observeAudioPosition() {

  const searcher = new Searcher
  searcher.app = this.app

  this.intervalIndex = setInterval(() => {

    const el = this.$el
    const app = this.app

    if (!this.audio) return
    if (!app.appElement) return

    const appStyle = getComputedStyle(app.appElement)
    const appRect = app.appElement.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()


    const relX = elRect.x - appRect.x
    const relY = elRect.y - appRect.y
    const centerX = parseFloat(appStyle.width) / 2
    const centerY = parseFloat(appStyle.height) / 2

    const x = relX - centerX
    const y = centerY - relY


    // 현재 객체의 z좌표를 계산하기 위해 객체의 상위 body를 모두 구해 배열에 담습니다.
    // 이후 body의 z좌표를 누산기로 계산하여 최종 z좌표를 얻어냅니다.
    let bodys = []
    let body = el
    do {
      body = searcher.getElementFromChildren(body)
      if (!body) break
      bodys.push(body)
    } while (body.classList.contains('we-body'))
    const z = bodys.reduce((perspAcc, body) => {
      perspAcc -= getComputedTranslateZ(body)
      // 만일 children 컴포넌트로 인해 자식 객체도 존재한다면 카메라의 Z좌표만큼을 추가합니다.
      let camera
      if (camera = body.querySelector('.we-camera')) perspAcc += getComputedTranslateZ(camera)
      return perspAcc
    }, 0)

    this.audio.pannerAttr(CONFIG)
    this.audio.orientation(0, 0, 0)
    this.audio.pos(x, y, z)

  }, this.body.component.audio.recaching)

}