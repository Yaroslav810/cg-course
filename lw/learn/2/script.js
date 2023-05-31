const fragment = `
void main(void) {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}`
const vertex = `
attribute vec3 aVertexPosition;
void main(void) {
    gl_Position = vec4(aVertexPosition, 1.0);
}`

// установка шейдеров
function initShaders(context) {
    // получаем шейдеры
    const fragmentShader = getShader(context, context.FRAGMENT_SHADER)
    const vertexShader = getShader(context, context.VERTEX_SHADER)

    //создаем объект программы шейдеров
    const shaderProgram = context.createProgram()
    // прикрепляем к ней шейдеры
    context.attachShader(shaderProgram, vertexShader)
    context.attachShader(shaderProgram, fragmentShader)
    // связываем программу с контекстом webgl
    context.linkProgram(shaderProgram)

    if (!context.getProgramParameter(shaderProgram, context.LINK_STATUS)) {
        console.log('Не удалсь установить шейдеры')
    }

    context.useProgram(shaderProgram)
    // установка атрибута программы
    shaderProgram.vertexPositionAttribute = context.getAttribLocation(shaderProgram, 'aVertexPosition')
    // делаем доступным атрибут для использования
    context.enableVertexAttribArray(shaderProgram.vertexPositionAttribute)

    return shaderProgram
}

// Функция создания шейдера по типу
function getShader(context, type) {
    const source = type === context.FRAGMENT_SHADER
        ? fragment
        : vertex

    // создаем шейдер по типу
    const shader = context.createShader(type)
    // установка источника шейдера
    context.shaderSource(shader, source)
    // компилируем шейдер
    context.compileShader(shader)

    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        console.log('Ошибка компиляции шейдера: ' + context.getShaderInfoLog(shader))
        context.deleteShader(shader)
        return null
    }

    return shader
}

// установка буфера вершин 
function initBuffers(context) {

    const vertices = [
        -0.5, -0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, 0.5, 0.0,
        0.5, -0.5, 0.0
    ]
    const vertexBuffer = context.createBuffer()
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer)
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW)
    vertexBuffer.itemSize = 3
    vertexBuffer.numberOfItems = 4

    const indices = [0, 1, 2, 0, 3, 2]
    const indexBuffer = context.createBuffer()
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, indexBuffer)
    context.bufferData(context.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), context.STATIC_DRAW)
    indexBuffer.numberOfItems = indices.length

    return {
        vertexBuffer,
        indexBuffer,
    }
}

// отрисовка 
function draw(context, shaderProgram, vertexBuffer, indexBuffer) {
    context.clearColor(0.0, 0.0, 0.0, 1.0)
    context.viewport(0, 0, context.viewportWidth, context.viewportHeight)
    context.clear(context.COLOR_BUFFER_BIT)

    context.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        vertexBuffer.itemSize,
        context.FLOAT,
        false,
        0,
        0
    )
    context.drawElements(
        context.LINE_LOOP,
        indexBuffer.numberOfItems,
        context.UNSIGNED_SHORT,
        0,
    )
}

window.onload = function() {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('webgl')

    context.viewportWidth = canvas.width
    context.viewportHeight = canvas.height

    const shaderProgram = initShaders(context)
    const {vertexBuffer, indexBuffer} = initBuffers(context)
    draw(context, shaderProgram, vertexBuffer, indexBuffer)
}