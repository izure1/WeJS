const UNIT_SCALE = 100 // Box2d에서 사용하는 바디(body)크기비율입니다. px과 100:1 비율입니다.
const MINSIZE = 0.001 // Box2d에서 사용할 수 있는 바디(body)의 최소 크기입니다.

let DEF_FIXTURE = null
let DEF_SHAPE = null

function GET_FIXTURE_DEF(B) {

  if (!DEF_FIXTURE) {
    DEF_FIXTURE = new B.b2FixtureDef
  }

  return DEF_FIXTURE

}

function GET_SHAPE_DEF(B) {

  if (!DEF_SHAPE) {
    DEF_SHAPE = new B.b2PolygonShape
  }

  return DEF_SHAPE

}

export default function createFixture() {

  const B = this.scene.physics
  const size = this.bodySize

  // Box2d 메모리 누수 오류 처리를 위해 Def 객체를 재활용하여 사용합니다.
  const fixture = GET_FIXTURE_DEF(B)
  const shape = GET_SHAPE_DEF(B)

  let boxWidth = size[0] / 2 / UNIT_SCALE
  let boxHeight = size[1] / 2 / UNIT_SCALE


  if (boxWidth < MINSIZE) boxWidth = MINSIZE
  if (boxHeight < MINSIZE) boxHeight = MINSIZE

  // 바디의 기준점이 되는 위치(0~1)를 지정합니다. 0.5는 정중앙을 의미합니다.
  const boxCenterX = 0.5
  const boxCenterY = 0.5


  // 중앙 좌표와 설정을 이용하여 Def 빌더 객체를 이용하여 실제 바디를 만듭니다.
  const position = new B.b2Vec2(
    boxWidth * boxCenterX,
    boxHeight * boxCenterY
  )
  const {
    density,
    friction,
    restitution,
  } = this.body

  shape.SetAsBox(boxWidth, boxHeight, position, 0)
  fixture.set_density(density)
  fixture.set_friction(friction)
  fixture.set_restitution(restitution)
  fixture.set_shape(shape)

  return fixture

}