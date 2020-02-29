class Vector {
    static create(width, height) {
        const x = width
        const y = height
        return { width, height, x, y }
    }
}

class ElementSize {

    static getSize(src, tag, x, y) {
        return new Promise((resolve, reject) => {
            const el = document.createElement(tag)
            el.src = src
            el.onload = () => {
                x = el[x]
                y = el[y]
                resolve(Vector.create(x, y))
            }
            el.onerror = el.onabort = () => {
                reject(Vector.create(0, 0))
            }
        })
    }

}

class ImageSize {
    static x = 'naturalWidth'
    static y = 'naturalHeight'
    static el = 'img'

    static async calc(src) {
        const { el, x, y } = ImageSize
        return await ElementSize.getSize(src, el, x, y)
    }
}

class VideoSize {
    static x = 'videoWidth'
    static y = 'videoHeight'
    static el = 'video'

    static async calc(src) {
        const { el, x, y } = VideoSize
        return await ElementSize.getSize(src, el, x, y)
    }
}


export { ImageSize, VideoSize }