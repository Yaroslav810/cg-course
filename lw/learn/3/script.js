const fragment = `
varying highp vec4 vColor;

void main(void) {
    gl_FragColor = vColor;
}`
const vertex = `
attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;

varying vec4 vColor;

void main(void) {
    gl_Position = vec4(aVertexPosition, 1.0);
    vColor = vec4(aVertexColor, 1.0);
}`

function initShaders(context) {
    const fragmentShader = getShader(context, context.FRAGMENT_SHADER)
    const vertexShader = getShader(context, context.VERTEX_SHADER)

    const shaderProgram = context.createProgram()
    context.attachShader(shaderProgram, vertexShader)
    context.attachShader(shaderProgram, fragmentShader)
    context.linkProgram(shaderProgram)

    context.useProgram(shaderProgram)

    shaderProgram.vertexPositionAttribute = context.getAttribLocation(shaderProgram, 'aVertexPosition')
    context.enableVertexAttribArray(shaderProgram.vertexPositionAttribute)
    shaderProgram.vertexColorAttribute = context.getAttribLocation(shaderProgram, 'aVertexColor')
    context.enableVertexAttribArray(shaderProgram.vertexColorAttribute)

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

    const vertices = [
        0.0,  0.5,  0.0,
        -0.5, -0.5,  0.0,
        0.5, -0.5,  0.0
    ]
    const vertexBuffer = context.createBuffer()
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer)
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW)
    vertexBuffer.itemSize = 3
    vertexBuffer.numberOfItems = 3

    const сolors = [
        1.0, 0.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0
    ]
    const colorBuffer = context.createBuffer()
    context.bindBuffer(context.ARRAY_BUFFER, colorBuffer)
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(сolors), context.STATIC_DRAW)

    return {
        vertexBuffer,
        colorBuffer,
    }
}

function draw(context, shaderProgram, vertexBuffer, colorBuffer) {
    context.clearColor(0.0, 0.0, 0.0, 1.0)
    context.viewport(0, 0, context.viewportWidth, context.viewportHeight)
    context.clear(context.COLOR_BUFFER_BIT)

    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer)
    context.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        vertexBuffer.itemSize,
        context.FLOAT,
        false,
        0,
        0,
    )

    context.bindBuffer(context.ARRAY_BUFFER, colorBuffer)
    context.vertexAttribPointer(
        shaderProgram.vertexColorAttribute,
        vertexBuffer.itemSize,
        context.FLOAT,
        false,
        0,
        0,
    )

    context.drawArrays(
        context.TRIANGLES,
        0,
        vertexBuffer.numberOfItems,
    )
}

window.onload = function() {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('webgl')

    context.viewportWidth = canvas.width
    context.viewportHeight = canvas.height

    const shaderProgram = initShaders(context)
    const {vertexBuffer, colorBuffer} = initBuffers(context)
    draw(context, shaderProgram, vertexBuffer, colorBuffer)
}