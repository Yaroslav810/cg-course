const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawPixel(x, y) {
    ctx.fillRect(x, y, 1, 1)
}

function drawCircle(center, r, color = '#000000') {
    ctx.fillStyle = color
    let x = 0
    let y = r
    let delta = 1 - 2 * r
    let error = 0
    while (y >= x) {
        drawPixel(center.x + x, center.y + y)
        drawPixel(center.x + x, center.y - y)
        drawPixel(center.x - x, center.y + y)
        drawPixel(center.x - x, center.y - y)
        drawPixel(center.x + y, center.y + x)
        drawPixel(center.x + y, center.y - x)
        drawPixel(center.x - y, center.y + x)
        drawPixel(center.x - y, center.y - x)
        error = 2 * (delta + y) - 1
        if ((delta < 0) && (error <= 0)) {
            delta += 2 * ++x + 1
            continue
        }
        if ((delta > 0) && (error > 0)) {
            delta -= 2 * --y + 1
            continue
        }
        delta += 2 * (++x - --y)
    }
}

drawCircle({x: 500, y: 300}, 200)
