export default function cycleStart() {

  for (const fn of this.body.lifecycle.start) fn()

}