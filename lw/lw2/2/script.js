const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

const SHOW_MODAL = 'show'
const MODAL_ATTRIBUTE = 'data'
const NEW_MODAL = 'new-modal'
const SAVE_MODAL = 'save-modal'
const COLOR_ATTRIBUTE = 'color'
const COLOR = {
    BLACK: 'black',
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
}


function initColors(ctx) {
    const buttons = document.getElementById('buttons')
    const black = document.getElementById('black')
    const red = document.getElementById('red')
    const green = document.getElementById('green')
    const blue = document.getElementById('blue')

    buttons.setAttribute(COLOR_ATTRIBUTE, COLOR.BLACK)

    black.addEventListener('click', () => {
        ctx.strokeStyle = '#000000'
        buttons.setAttribute(COLOR_ATTRIBUTE, COLOR.BLACK)
    })
    red.addEventListener('click', () => {
        ctx.strokeStyle = '#FF0000'
        buttons.setAttribute(COLOR_ATTRIBUTE, COLOR.RED)
    })
    green.addEventListener('click', () => {
        ctx.strokeStyle = '#00FF00'
        buttons.setAttribute(COLOR_ATTRIBUTE, COLOR.GREEN)
    })
    blue.addEventListener('click', () => {
        ctx.strokeStyle = '#0000FF'
        buttons.setAttribute(COLOR_ATTRIBUTE, COLOR.BLUE)
    })
}

function initButton(input, canvas, ctx, openNewModal, openSaveModal) {
    const newButton = document.getElementById('new')
    const openButton = document.getElementById('open')
    const saveButton = document.getElementById('save')

    function onOpen() {
        input.click()
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
            image.onload = () => {
                canvas.width = image.naturalWidth
                canvas.height = image.naturalHeight
                ctx.drawImage(image, 0, 0)
            }
        }
    }

    initColors(ctx)

    newButton.addEventListener('click', openNewModal)
    openButton.addEventListener('click', onOpen)
    saveButton.addEventListener('click', openSaveModal)
    input.addEventListener('change', onFileChange)
}

function initCanvas(canvas) {
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    return ctx
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
        ctx.lineTo(x + 1, y + 1)
        ctx.stroke()
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

function initNewModal(canvas, ctx, onCloseModal) {
    const newModal = document.getElementById('new-modal')
    const widthField = document.getElementById('width-input')
    const heightField = document.getElementById('height-input')

    widthField.value = CANVAS_WIDTH
    heightField.value = CANVAS_HEIGHT

    newModal
        .getElementsByClassName('cancel-button')[0]
        .addEventListener('click', onCloseModal)
    newModal
        .getElementsByClassName('save-button')[0]
        .addEventListener('click', event => {
            canvas.width = widthField.value.trim() || CANVAS_WIDTH
            canvas.height = heightField.value.trim() || CANVAS_HEIGHT
            ctx.fillStyle = '#FFFFFF'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            onCloseModal(event)
        })
}

function initSaveModal(canvas, onCloseModal) {
    const saveModal = document.getElementById('save-modal')
    const link = document.getElementById('link')
    const types = saveModal.getElementsByTagName('input')

    saveModal
        .getElementsByClassName('cancel-button')[0]
        .addEventListener('click', onCloseModal)
    saveModal
        .getElementsByClassName('save-button')[0]
        .addEventListener('click', event => {
            const type = Array.from(types).find(t => t.checked)
            if (type) {
                link.download = `image.${type.value}`
                link.href = canvas.toDataURL(`image/${type.value}`)
                link.click()
                onCloseModal(event)
            }
        })
}

function initModal(canvas, ctx) {
    const modalOverflow = document.getElementById('overflow')
    const modal = document.getElementById('modal')

    function onCloseModal(event) {
        event.preventDefault()
        modalOverflow.classList.remove(SHOW_MODAL)
        modalOverflow.removeAttribute(MODAL_ATTRIBUTE)
    }

    modal.addEventListener('click', event => event.stopPropagation())
    modalOverflow.addEventListener('click', () => modalOverflow.classList.remove(SHOW_MODAL))

    initNewModal(canvas, ctx, onCloseModal)
    initSaveModal(canvas, onCloseModal)

    return {
        openNewModal: () => {
            modalOverflow.classList.add(SHOW_MODAL)
            modalOverflow.setAttribute(MODAL_ATTRIBUTE, NEW_MODAL)
        },
        openSaveModal: () => {
            modalOverflow.classList.add(SHOW_MODAL)
            modalOverflow.setAttribute(MODAL_ATTRIBUTE, SAVE_MODAL)
        },
    }
}

function start () {
    const input = document.getElementById('input')
    const canvas = document.getElementById('canvas')

    const ctx = initCanvas(canvas)
    const {openNewModal, openSaveModal} = initModal(canvas, ctx)
    initButton(input, canvas, ctx, openNewModal, openSaveModal)
    initMouseDraw(canvas, ctx)
}

start()

// TODO: Open создаёт новый холст с размерами картинки