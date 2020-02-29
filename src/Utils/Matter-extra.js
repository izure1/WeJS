import Matter from 'matter-js'


const MatterExtra = {
    Vertices: {},
    Body: {},
}

/**
 * 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Matter.Body} object 
 */
MatterExtra.Vertices.rectangle = function rectangle(width, height, object) {
    width /= 2
    height /= 2
    return Matter.Vertices.create([
        Matter.Vector.create(-width, -height),
        Matter.Vector.create(width, -height),
        Matter.Vector.create(width, height),
        Matter.Vector.create(-width, height),
    ], object)
}

/**
 * 
 * @param {Number} width 
 * @param {Number} height 
 * @param {Matter.Body} object 
 */
MatterExtra.Body.changeSize = function changeSize(width, height, object) {
    Matter.Body.setVertices(object, MatterExtra.Vertices.rectangle(width, height, object))
}



for (const namespace in MatterExtra)
    Object.assign(MatterExtra[namespace], Matter[namespace])

export default MatterExtra