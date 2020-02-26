import Tick from '../../Utils/Tick'


export default function cycleDestroy() {

    Tick.cancelRequest(this.updateRequestId)

    for (const fn of this.body.lifecycle.destroy)
        fn(this.body.lifecycle.dataTransfer)

}