const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

function start() {
    const canvas = document.getElementById('canvas')

    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT

    const ctx = canvas.getContext('webgl')

}

// start()

const canvas = document.getElementById('canvas')

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

const ctx = canvas.getContext('webgl')

window.onkeydown = checkKey
function checkKey(ev)
{
    switch(ev.keyCode)
    {
        case 49:
        {
            // 1
            ctx.clearColor(0.3,0.7,0.2,1.0)
            clear()
            break
        }
        case 50:
        {
            // 2
            ctx.clearColor(0.3,0.2,0.7,1.0)
            clear()
            break
        }
        case 51:
        {
            // 3
            const color = ctx.getParameter(ctx.COLOR_CLEAR_VALUE)
            alert('clearColor = (' +
                Math.round(color[0]*10)/10 +
                ',' + Math.round(color[1]*10)/10+
                ',' + Math.round(color[2]*10)/10+')')
            window.focus()
            break
        }
    }
}

function clear()
{
    ctx.clear(ctx.COLOR_BUFFER_BIT);
    ctx.viewport(0, 0, 800, 600);
}
