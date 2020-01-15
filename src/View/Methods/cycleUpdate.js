import AnimationFrame from '../../Utils/AnimationFrame'


export default function cycleUpdate() {

  this.updateRequestId = AnimationFrame.request((step, deltaTime) => {
    for (const fn of this.body.lifecycle.update) fn(deltaTime)
  })

}