import Tick from '../../../Utils/Tick'


export default function generate() {
    
    this.stop()
    this.interval = Tick.request(() => {
        for (let i = 0; i < this.body.component.particle.quantity; i++)
            this.add()
    }, this.body.component.particle.interval)
    
}