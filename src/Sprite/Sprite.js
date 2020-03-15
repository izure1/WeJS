class Sprite {

    start = 0
    end = 0
    frame = 1
    fps = 1
    src = 1
    current = 0

    constructor({ start, end, fps, src, frame }) {
        this.start = start
        this.end = end
        this.fps = fps
        this.src = src
        this.frame = frame
    }

    next() {
        this.current++
        if (this.current > this.end) {
            this.current = this.start
        }
    }

    getOffsetScale() {
        return this.end - this.start
    }

}


export default Sprite