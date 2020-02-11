import Matter from 'matter-js'


function p(x, y) {
    return { x, y }
}

export default function requestCreateBody() {

    // 크기에 오류가 있을 시 바디를 만들지 않습니다.
    if (this.bodySize.filter(t => isNaN(t)).length) return
    
    // 물리객체가 생성되어 있다면 생성하지 않습니다.
    // 대신 크기 조절만 합니다.
    if (this.object) {

        const width = this.bodySize[0] / 2
        const height = this.bodySize[1] / 2

        const vertices = Matter.Vertices.create([p(-width, -height), p(width, -height), p(width, height), p(-width, height)], object)
        Matter.Body.setVertices(this.object, vertices)

        return

    }


    const { x, y } = this.body.component.transform
    const { isStatic, isSensor } = this.body.component.physics


    this.object = Matter.Bodies.rectangle(x, -y, this.bodySize[0], this.bodySize[1], { isStatic, isSensor })

    // 만일 fixedRotation 값을 이용하여 intertia를 Infinity로 지정하였을 때, 다시 원래대로 돌려놓기 위한 임시값을 저장해둡니다.
    // 이는 fixedRotation 값을 false로 지정할 때, 이 값이 사용됩니다.
    this.inertia = this.object.inertia
    
    Matter.World.add(this.scene.physics.world, this.object)
    Matter.Events.trigger(this.scene.physics.world, 'createPhysicsBody', { object: this.object, body: this.body })
    
    this.setFriction()
    this.setRestitution()
    this.setFixedRotation()
  
}