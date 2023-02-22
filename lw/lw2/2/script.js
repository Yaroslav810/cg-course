const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

function initButton(input, ctx) {
    const newButton = document.getElementById('new')
    const openButton = document.getElementById('open')
    const saveButton = document.getElementById('save')

    function onNew() {
        console.log('new')
    }

    function onOpen() {
        input.click()
    }

    function onSave() {
        console.log('save')
    }

    function onFileChange(event) {
        const [file] = event.target.files
        if (!['image/jpeg', 'image/png', 'image/bmp'].includes(file.type)) {
            alert('Invalid type')
            input.value = ''
            return
        }
        if (file) {
            const image = new Image()
            image.src = URL.createObjectURL(file)
            image.onload = () => ctx.drawImage(image, 0, 0)
        }
    }

    newButton.addEventListener('click', onNew)
    openButton.addEventListener('click', onOpen)
    saveButton.addEventListener('click', onSave)
    input.addEventListener('change', onFileChange)
}

function initCanvas(canvas) {
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    return canvas.getContext('2d')
}

function initMouseDraw(canvas, ctx) {
    let drawing = false

    function coordinateCorrection(x, y) {
        return {
            x: x - canvas.offsetLeft,
            y: y - canvas.offsetTop,
        }
    }

    function onMouseDown(event) {
        drawing = true
        ctx.beginPath()
        const {x, y} = coordinateCorrection(event.pageX, event.pageY)
        ctx.moveTo(x, y)
    }

    function onMouseMove(event) {
        if (drawing) {
            const {x, y} = coordinateCorrection(event.pageX, event.pageY)
            ctx.lineTo(x, y)
            ctx.stroke()
        }
    }

    function onMouseUp(event) {
        drawing = false
        const {x, y} = coordinateCorrection(event.pageX, event.pageY)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.closePath()
    }

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)
}

function start () {
    const input = document.getElementById('input')
    const canvas = document.getElementById('canvas')

    const ctx = initCanvas(canvas)
    initButton(input, ctx)
    initMouseDraw(canvas, ctx)
}

start()