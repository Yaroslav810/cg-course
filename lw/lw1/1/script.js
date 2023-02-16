const letters = document.getElementById('svg').querySelectorAll('g')

const DELAY = 300
const G = 10
const V0 = 100

function animation(letter) {
    let start = performance.now()
    let h = 0
    let v = V0

    requestAnimationFrame(function animate(time) {
        const timestamp = (time - start) / 100

        if (h < 0) {
            start = performance.now()
            h = 0
            v = V0
        }

        letter.style.transform = `translateY(${-h}px)`
        h = V0 * timestamp - G * timestamp * timestamp / 2
        v = V0 - G * timestamp

        requestAnimationFrame(animate)
    })
}

letters.forEach((letter, index) => {
    setTimeout(() => {
        animation(letter)
    }, index * DELAY)
})
