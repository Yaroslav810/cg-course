import './gl-matrix-min.js'

const fragment = `
varying highp vec4 vColor;

void main(void) {
    gl_FragColor = vColor;
}`
const vertex = `
attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;
varying highp vec4 vColor;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main(void) {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
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

    //
    shaderProgram.vertexColorAttribute = context.getAttribLocation(shaderProgram, 'aVertexColor')
    context.enableVertexAttribArray(shaderProgram.vertexColorAttribute)
    shaderProgram.MVMatrix = context.getUniformLocation(shaderProgram, 'uMVMatrix')
    shaderProgram.ProjMatrix = context.getUniformLocation(shaderProgram, 'uPMatrix')
    //

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
        0.577350269190, 0.816496580928, -0.000000000000,
        -0.288675134595, 0.816496580928, 0.500000000000,
        0.866025403784, 0.000000000000, 0.500000000000,
        -0.000000000000, 0.000000000000, 1.000000000000,
        -0.000000000000, 0.000000000000, -1.000000000000,
        0.288675134595, -0.816496580928, -0.500000000000,
        -0.866025403784, 0.000000000000, -0.500000000000,
        -0.577350269190, -0.816496580928, -0.000000000000,
        0.288675134595, -0.816496580928, 0.500000000000,
        -0.866025403784, -0.000000000000, 0.500000000000,
        -0.288675134595, 0.816496580928, -0.500000000000,
        0.866025403784, -0.000000000000, -0.500000000000,
    ]
    // const vertices = [
    //     // лицевая часть
    //     -0.5, -0.5, 0.5,
    //     -0.5, 0.5, 0.5,
    //     0.5, 0.5, 0.5,
    //     0.5, -0.5, 0.5,
    //     // задняя часть
    //     -0.5, -0.5, -0.5,
    //     -0.5, 0.5, -0.5,
    //     0.5, 0.5, -0.5,
    //     0.5, -0.5, -0.5
    // ]
    const vertexBuffer = context.createBuffer()
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer)
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW)
    vertexBuffer.itemSize = 3
    vertexBuffer.numberOfItems = 12
    // vertexBuffer.itemSize = 3
    // vertexBuffer.numberOfItems = 3

    const indices = [
        0, 1, 2,
        1, 3, 2,
        4, 5, 6,
        5, 7, 6,
        7, 8, 9,
        8, 3, 9,
        4, 10, 11,
        10, 0, 11,
        6, 9, 10,
        9, 1, 10,
        5, 11, 8,
        11, 2, 8,
        3, 1, 9,
        11, 5, 4,
        3, 8, 2,
        6, 10, 4,
        1, 0, 10,
        8, 7, 5,
        2, 11, 0,
        7, 9, 6,
    ]
    // const indices = [
    //     // лицевая часть
    //     0, 1, 2,
    //     2, 3, 0,
    //     //нижняя часть
    //     0, 4, 7,
    //     7, 3, 0,
    //     // левая боковая часть
    //     0, 1, 5,
    //     5, 4, 0,
    //     // правая боковая часть
    //     2, 3, 7,
    //     7, 6, 2,
    //     // верхняя часть
    //     2, 1, 6,
    //     6, 5, 1,
    //     // задняя часть
    //     4, 5, 6,
    //     6, 7, 4,
    // ]
    const indexBuffer = context.createBuffer()
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer)
    context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW)
    indexBuffer.numberOfItems = indices.length

    // const сolors = [
    //     0.0, 0.0, 1.0, // 0
    //     0.0, 0.0, 1.0, // 1
    //     0.0, 0.0, 1.0, // 2
    //     0.0, 1.0, 0.0, // 3
    //     0.0, 1.0, 0.0, // 4
    //     0.0, 1.0, 0.0, // 5
    //     0.0, 1.0, 1.0, // 6
    //     1.0, 0.0, 1.0, // 7
    //     1.0, 0.0, 1.0, // 8
    //     1.0, 0.0, 1.0, // 9
    //     1.0, 1.0, 1.0, // 10
    //     1.0, 1.0, 1.0, // 11
    //     1.0, 1.0, 0.0, // 12
    //     1.0, 1.0, 0.0, // 13
    //     1.0, 1.0, 0.0, // 14
    //     1.0, 1.0, 0.0, // 15
    //     1.0, 1.0, 0.0, // 16
    //     1.0, 1.0, 0.0, // 17
    //     1.0, 1.0, 0.0, // 18
    //     1.0, 1.0, 0.0, // 19
    // ]
    const сolors = [
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 1.0,
        1.0, 0.0, 1.0,
        0.0, 1.0, 1.0,
        0.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
    ]
    const colorBuffer = context.createBuffer()
    context.bindBuffer(context.ARRAY_BUFFER, colorBuffer)
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(сolors), context.STATIC_DRAW)

    return {
        vertexBuffer,
        indexBuffer,
        colorBuffer,
    }
}

function draw(context, shaderProgram, vertexBuffer, indexBuffer, colorBuffer) {
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
        0
    )

    context.bindBuffer(context.ARRAY_BUFFER, colorBuffer)
    context.vertexAttribPointer(
        shaderProgram.vertexColorAttribute,
        vertexBuffer.itemSize,
        context.FLOAT,
        false,
        0,
        0
    )

    context.enable(context.CULL_FACE)
    context.cullFace(context.BACK)
    context.frontFace(context.CCW)

    context.enable(context.DEPTH_TEST)
    context.drawElements(
        context.TRIANGLES,
        indexBuffer.numberOfItems,
        context.UNSIGNED_SHORT,
        0,
    )
}

function setupWebGL(context, pMatrix, mvMatrix)
{
    context.clearColor(0.0, 0.0, 0.0, 1.0)
    context.clear(context.COLOR_BUFFER_BIT || context.DEPTH_BUFFER_BIT)

    context.viewport(0, 0, context.viewportWidth, context.viewportHeight)
    mat4.perspective(pMatrix, 1.04, context.viewportWidth / context.viewportHeight, 0.1, 100.0)
    mat4.identity(mvMatrix)
    // mat4.translate(mvMatrix, mvMatrix,[0, 0, -2.0])
    // mat4.rotate(mvMatrix, mvMatrix, 2.0, [0, 1, 0])
    mat4.lookAt(mvMatrix, [1, 0,-3], [0,0,0], [0,1,0])
}

function setMatrixUniforms(context, shaderProgram, pMatrix, mvMatrix){
    context.uniformMatrix4fv(shaderProgram.ProjMatrix,false, pMatrix)
    context.uniformMatrix4fv(shaderProgram.MVMatrix, false, mvMatrix)
}

window.onload = function() {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('webgl')

    context.viewportWidth = canvas.width
    context.viewportHeight = canvas.height

    const shaderProgram = initShaders(context)
    const {
        vertexBuffer,
        indexBuffer,
        colorBuffer
    } = initBuffers(context)

    //
    const mvMatrix = mat4.create()
    const pMatrix = mat4.create()
    setupWebGL(context, pMatrix, mvMatrix)
    setMatrixUniforms(context, shaderProgram, pMatrix, mvMatrix)
    //

    draw(context, shaderProgram, vertexBuffer, indexBuffer, colorBuffer)
}