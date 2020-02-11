export default function cycleStart() {

    for (const fn of this.body.lifecycle.start)
        fn(this.body.lifecycle.dataTransfer)

}