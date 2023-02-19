function initDragAndDrop(image) {
    const transform = {x: 0, y: 0}

    function moveImage(pageX, pageY) {
        transform.x += pageX
        transform.y += pageY
        image.style.transform = `translate(${transform.x}px, ${transform.y}px)`
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }

    function onMouseMove(event) {
        moveImage(event.movementX, event.movementY)
    }

    function onMouseDown() {
        document.addEventListener('mouseup', onMouseUp)
        document.addEventListener('mousemove', onMouseMove)
    }

    image.draggable = false
    image.addEventListener('mousedown', onMouseDown)
}

function initImage(input, image) {
    function onFileChange(event) {
        const [file] = event.target.files
        if (!['image/jpeg', 'image/png', 'image/bmp'].includes(file.type)) {
            alert('Invalid type')
            input.value = ''
            return
        }
        if (file) {
            image.src = URL.createObjectURL(file)
        }
    }

    input.addEventListener('change', onFileChange)
}

function start () {
    const input = document.getElementById('input')
    const image = document.getElementById('image')

    initDragAndDrop(image)
    initImage(input, image)
}

start()