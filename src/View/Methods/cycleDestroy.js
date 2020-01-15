import AnimationFrame from '../../Utils/AnimationFrame'


export default function cycleDestroy() {

  AnimationFrame.cancelRequest(this.updateRequestId)
  for (const fn of this.body.lifecycle.destroy) fn()

}