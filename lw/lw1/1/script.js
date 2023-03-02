const letters = document.getElementById('svg').querySelectorAll('g')

const DELAY = 300
const G = 10
const V0 = 100
const PING = 100 // TODO: Переименовать

function animation(letter) {
    let start = performance.now()
    let h = 0

    requestAnimationFrame(function animate(time) {
        const timestamp = (time - start) / PING // TODO: timeInterval?

        if (h < 0) {
            start = performance.now()
            h = 0
        }

        letter.style.transform = `translateY(${-h}px)`
        h = V0 * timestamp - G * timestamp * timestamp / 2

        requestAnimationFrame(animate)
    })
}

letters.forEach((letter, index) => {
    setTimeout(() => {
        animation(letter)
    }, index * DELAY)
})

// TODO: Сделать движение горизонтально
