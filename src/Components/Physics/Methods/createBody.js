let DEF_BODY = null

function GET_BODY_DEF(B) {

  if (!DEF_BODY) {
    DEF_BODY = new B.b2BodyDef
  }

  return DEF_BODY

}


export default function createBody() {

  const B = this.scene.physics
  const body = GET_BODY_DEF(B)
  
  let type
  switch (this.body.component.physics.type) {

    case 'static':
      type = B.b2_staticBody
      break

    case 'dynamic':
      type = B.b2_dynamicBody
      break

    default:
      type = B.b2_dynamicBody
      break

  }

  body.set_type(type)
  return body

}