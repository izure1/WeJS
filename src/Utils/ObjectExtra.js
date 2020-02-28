class ObjectExtra extends Object {
    constructor(...args) {
        super(...args)
    }
}

/**
 * 
 * @param {Object} target  target object
 * @param  {...Object} sources  sources
 */
ObjectExtra.overwrite = function overwrite(target, ...sources) {
    const keys = Object.keys(target)
    const result = target
    for (const source of sources) {
        for (const prop of Object.keys(source)) {
            if (keys.indexOf(prop) === -1) continue
            target[prop] = source[prop]
        }
    }
    return result
}


export default ObjectExtra