const svg = document.getElementById('svg')
const house = document.getElementById('house')

const transform = {x: 0, y: 0}

function moveAt(pageX, pageY) {
    const CTM = svg.getScreenCTM()
    transform.x += pageX / CTM.a
    transform.y += pageY / CTM.d
    house.style.transform = `translate(${transform.x}px, ${transform.y}px)`
}

function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
}

function onMouseMove(event) {
    moveAt(event.movementX, event.movementY)
}

function onMouseDown() {
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)
}

house.addEventListener('mousedown', onMouseDown)
