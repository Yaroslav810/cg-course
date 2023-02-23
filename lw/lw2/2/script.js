const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

const SHOW_MODAL = 'show'
const MODAL_ATTRIBUTE = 'data'
const NEW_MODAL = 'new-modal'
const SAVE_MODAL = 'save-modal'

function initButton(input, ctx, openNewModal, openSaveModal) {
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
            image.onload = () => ctx.drawImage(image, 0, 0)
        }
    }

    newButton.addEventListener('click', openNewModal)
    openButton.addEventListener('click', onOpen)
    saveButton.addEventListener('click', openSaveModal)
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

function initModal() {
    const modalOverflow = document.getElementById('overflow')
    const modal = document.getElementById('modal')
    const newModal = document.getElementById('new-modal')
    const saveModal = document.getElementById('save-modal')

    function onCloseModal(event) {
        event.preventDefault()
        modalOverflow.classList.remove(SHOW_MODAL)
        modalOverflow.removeAttribute(MODAL_ATTRIBUTE)
    }

    modal.addEventListener('click', event => event.stopPropagation())
    modalOverflow.addEventListener('click', () => modalOverflow.classList.remove(SHOW_MODAL))
    newModal
        .getElementsByClassName('cancel-button')[0]
        .addEventListener('click', onCloseModal)
    saveModal
        .getElementsByClassName('cancel-button')[0]
        .addEventListener('click', onCloseModal)

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
    const {openNewModal, openSaveModal} = initModal()
    initButton(input, ctx, openNewModal, openSaveModal)
    initMouseDraw(canvas, ctx)
}

start()