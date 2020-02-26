import Tick from '../../Utils/Tick'


export default function cycleUpdate() {

    this.updateRequestId = Tick.request((step, deltaTime) => {

        for (const fn of this.body.lifecycle.update)
            fn(this.body.lifecycle.dataTransfer, deltaTime)

    })

}