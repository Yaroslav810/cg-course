const fragment = `
void main(void) {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}`
const vertex = `
attribute vec2 aPosition;
uniform vec2 uResolution;

void main(void) {
    vec2 zeroToOne = aPosition / uResolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace, 0.0, 1.0);
}`
// gl_Position = vec4(aVertexPosition, 1.0);

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
    shaderProgram.vertexPositionAttribute = context.getAttribLocation(shaderProgram, 'aPosition')
    shaderProgram.resolutionAttribute = context.getUniformLocation(shaderProgram, 'uResolution')
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
    // установка буфера вершин
    const vertexBuffer = context.createBuffer()
    context.bindBuffer(context.ARRAY_BUFFER, vertexBuffer)
    // массив координат вершин объекта
    const triangleVertices = [
        10, 10,
        50, 10,
        30, 300,
    ]
    context.bufferData(context.ARRAY_BUFFER, new Float32Array(triangleVertices), context.STATIC_DRAW)
    // указываем кол-во точек
    vertexBuffer.itemSize = 3
    vertexBuffer.numberOfItems = 3

    return vertexBuffer
}

// отрисовка 
function draw(context, shaderProgram, vertexBuffer) {
    // установка области отрисовки
    context.viewport(0, 0, context.viewportWidth, context.viewportHeight)

    context.clear(context.COLOR_BUFFER_BIT)

    // указываем, что каждая вершина имеет по три координаты (x, y, z)
    context.vertexAttribPointer(
        shaderProgram.vertexPositionAttribute,
        2, // vertexBuffer.itemSize,
        context.FLOAT,
        false,
        0,
        0
    )
    context.uniform2f(shaderProgram.resolutionAttribute, context.canvas.width, context.canvas.height)
    // отрисовка примитивов - треугольников          
    context.drawArrays(
        context.TRIANGLES,
        0,
        vertexBuffer.numberOfItems
    )
}

window.onload = function() {
    // получаем элемент canvas
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('webgl')

    context.viewportWidth = canvas.width
    context.viewportHeight = canvas.height

    // установка шейдеров
    const shaderProgram = initShaders(context)

    // установка буфера вершин
    const vertexBuffer = initBuffers(context)

    // покрасим фон в бледно-розовый цвет
    context.clearColor(1.0, 0.0, 0.0, 0.5)

    // отрисовка сцены
    draw(context, shaderProgram, vertexBuffer)
}