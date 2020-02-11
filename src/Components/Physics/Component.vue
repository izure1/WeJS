<template>
    <div></div>
</template>

<script>
import Matter from 'matter-js'
import Searcher from '../../Utils/Searcher'
import Arrayset from '../../Utils/Arrayset'
import Component from '../../View/Component/Component'

import onChangeSize from './Methods/onChangeSize'
import destroyBody from './Methods/destroyBody'
import requestCreateBody from './Methods/requestCreateBody'
import setStatic from './Methods/setStatic'
import setFriction from './Methods/setFriction'
import setRestitution from './Methods/setRestitution'
import setFixedRotation from './Methods/setFixedRotation'
import update from './Methods/update'
import translate from './Methods/translate'
import transform from './Methods/transform'


export class Reservation extends Component {
    
    name = 'physics'
    friction = 1
    frictionAir = 0.01
    frictionStatic = 0.5
    restitution = 0.3
    isStatic = false
    isSender = false
    fixedRotation = false
    colliders = new Arrayset

    constructor(...args) {
        super(...args)
    }

    /**
     * 
     * @param {Number} x  x좌표로 가할 힘의 세기
     * @param {Number} y  y좌표로 가할 힘의 세기
     * 
     */
    applyForce(x, y) {
        Promise.resolve().then(async () => {
            await Component.waitAttached(this)
            const position = this.vue.object.position
            const dot = Matter.Vector.create(position.x, -position.y)
            const force = Matter.Vector.create(x, -y)
            Matter.Body.applyForce(this.vue.object, dot, force)
        })
    }

    setVelocity(x, y) {
        Promise.resolve().then(async () => {
            await Component.waitAttached(this)
            const velocity = Matter.Vector.create(x, -y)
            Matter.Body.setVelocity(this.vue.object, velocity)
        })
    }

    setAngularVelocity(velocity) {
        Promise.resolve().then(async () => {
            await Component.waitAttached(this)
            Matter.Body.setAngularVelocity(this.vue.object, velocity)
        })
    }
}

export default {
    props: ['scene', 'body'],
    data: () => ({
        updateRequestId: null,
        searcher: new Searcher,
        bodySize: [0, 0],
        inertia: 0,
        object: null,
    }),
    tracking: true,
    methods: {
        onChangeSize,
        destroyBody,
        requestCreateBody,
        setStatic,
        setFriction,
        setRestitution,
        setFixedRotation,
        update,
        translate,
        transform,
    },
    created() {
        Component.attachVue(this.body.component.physics, this)
        this.body.on('changesize', this.onChangeSize)
    },
    beforeDestroy() {
        this.destroyBody()
        this.body.off('changesize', this.onChangeSize)
    },

    watch: {
        // transform을 직접 수정할 경우, 물리를 추적하지 않습니다.
        'body.component.transform.x'() {
            this.transform()
        },
        'body.component.transform.y'() {
            this.transform()
        },
        'body.component.transform.rotateZ'() {
            this.transform()
        },
        'body.component.physics.type'() {
            this.setStatic()
        },
        'body.component.physics.friction'() {
            this.setFriction()
        },
        'body.component.physics.frictionAir'() {
            this.setFriction()
        },
        'bpdy.component.physics.frictionStatic'() {
            this.setFriction()
        },
        'body.component.physics.restitution'() {
            this.setRestitution()
        },
        'body.component.physics.fixedRotation'() {
            this.setFixedRotation()
        },
        'bodySize'() {
            this.requestCreateBody()
        }
    }

}
</script>