import Tick from '../../../Utils/Tick'


export default function stop() {
    Tick.cancelRequest(this.updateIntervalId)
}