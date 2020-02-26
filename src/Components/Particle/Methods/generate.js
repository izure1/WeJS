import Tick from '../../../Utils/Tick'
import { Particle } from '../../../Particle/Particle'


export default function generate() {
    this.intervalId = Tick.request(() => {
        const particle = new Particle
        particle.duration = 
        this.add()
    })
}