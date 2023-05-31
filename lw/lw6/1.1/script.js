const fragment = `
void main(void) {
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
}`
const vertex = `
attribute vec2 aPosition;
uniform vec2 uResolution;

void main(void) {
    
    float R = (1.0 + sin(aPosition.x)) 
        * (1.0 + 0.9 * cos(8.0 * aPosition.x)) 
        * (1.0 + 0.1 * cos(24.0 * aPosition.x)) 
        * (0.5 + 0.05 * cos(140.0 * aPosition.x));
    gl_Position = 
        mat4(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0), vec4(1.0, 1.0, 0.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0)) *
        mat4(vec4(0.4, 0.0, 0.0, 0.0), vec4(0.0, 0.4, 0.0, 0.0), vec4(0.0, 0.0, 1, 0.0), vec4(0.0, 0.0, 0.0, 1.0)) * 
        vec4(R * cos(aPosition.x), R * sin(aPosition.x), 0.0, 1.0);
}`

function initShaders(context) {
    const fragmentShader = getShader(context, context.FRAGMENT_SHADER)
    const vertexShader = getShader(context, context.VERTEX_SHADER)

    const shaderProgram = context.createProgram()
    context.attachShader(shaderProgram, vertexShader)
    context.attachShader(shaderProgram, fragmentShader)
    context.linkProgram(shaderProgram)

    context.useProgram(shaderProgram)
    shaderProgram.vertexPositionAttribute = context.getAttribLocation(shaderProgram, 'aPosition')
    shaderProgram.resolutionAttribute = context.getUniformLocation(shaderProgram, 'uResolution')
    context.enableVertexAttribArray(shaderProgram.vertexPositionAttribute)

    return shaderProgram
}

function getShader(context, type) {
    const source = type === context.FRAGMENT_SHADER
        ? fragment
        : vertex

    const shader = context.createShader(type)
    context.shaderSource(shader, source)
    context.compileShader(shader)

    return shader
}

function initBuffers(context) {
    const vertexBuffer = context.createBuffer()
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer)

    const vertices = []
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 1000) {
        vertices.push(i, 0, 0)
    }
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW)

    return vertexBuffer
}

function draw(context, shaderProgram, vertexBuffer) {
    context.clearColor(1.0, 1.0, 1.0, 1.0)
    context.viewport(0, 0, context.viewportWidth, context.viewportHeight)
    context.clear(context.COLOR_BUFFER_BIT)

    context.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        3,
        context.FLOAT,
        false,
        0,
        0
    )
    context.uniform2f(shaderProgram.resolutionAttribute, context.canvas.width, context.canvas.height)
    context.drawArrays(
        context.LINE_LOOP,
        0,
        2001,
    )
}

window.onload = function() {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('webgl')

    context.viewportWidth = canvas.width
    context.viewportHeight = canvas.height

    const shaderProgram = initShaders(context)
    const vertexBuffer = initBuffers(context)

    draw(context, shaderProgram, vertexBuffer)
}