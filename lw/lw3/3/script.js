import {BONUS_COMPLETING_LEVEL, BOX_SIZE, HEIGHT, LEVELS, SCORE, WIDTH} from './const.js'
import {getRandomTetramino} from './tetraminos.js'

function initCanvas() {
    const canvas = document.getElementById('canvas')
    canvas.width = WIDTH * BOX_SIZE + 100
    canvas.height = HEIGHT * BOX_SIZE
    return canvas
}

function initGame() {
    return {
        level: 1,
        linesLeft: LEVELS[1].lines,
        speed: LEVELS[1].speed,
        playField: Array(HEIGHT).fill(0).map(() => Array(WIDTH).fill(0)),
        score: 0,
        currentTetramino: getNextTetromino(),
        nextTetramino: getNextTetromino(),
        state: 'active',
        delay: 0,
    }
}

function getNextTetromino() {
    return {
        tetramino: getRandomTetramino(),
        row: 0,
        col: 4,
    }
}

function rotate(matrix) {
    return matrix.map((row, i) =>
        row.map((val, j) => matrix[matrix.length - 1 - j][i])
    )
}

function drawField(context, playField) {
    playField.forEach((row, i) => {
        row.forEach((column, j) => {
            if (playField[i][j] === 0) {
                context.strokeStyle = '#ffff00'
                context.lineWidth = 0.2
                context.globalAlpha = 0.2
                context.strokeRect(j * BOX_SIZE + 0.5, i * BOX_SIZE + 0.5, BOX_SIZE - 1, BOX_SIZE - 1)
                context.globalAlpha = 1
            } else {
                context.fillStyle = playField[i][j]
                context.fillRect(
                    j * BOX_SIZE,
                    i * BOX_SIZE,
                    BOX_SIZE - 1,
                    BOX_SIZE - 1
                )
            }
        })
    })
}

function drawTetramino(context, tetramino) {
    const {structure, color} = tetramino.tetramino
    context.fillStyle = color
    structure.forEach((row, i) => {
        row.forEach((item, j) => {
            if (item) {
                context.fillRect(
                    (tetramino.col + j) * BOX_SIZE,
                    (tetramino.row + i) * BOX_SIZE,
                    BOX_SIZE - 1,
                    BOX_SIZE - 1
                )
            }
        })
    })
}

function drawInfo(context, game) {
    context.fillStyle = '#ffffff'
    context.font = '12px serif'
    context.textAlign = 'left'
    context.fillText(`Level: ${game.level}`, WIDTH * BOX_SIZE + 15, 15)
    context.fillText(`Lines left: ${game.linesLeft}`, WIDTH * BOX_SIZE + 15, 35)
    context.fillText(`Score: ${game.score}`, WIDTH * BOX_SIZE + 15, 55)
    context.fillText('Next:', WIDTH * BOX_SIZE + 15, 75)
    const {structure, color} = game.nextTetramino.tetramino
    context.fillStyle = color
    structure.forEach((row, i) => {
        row.forEach((item, j) => {
            if (item) {
                context.fillRect(
                    WIDTH * BOX_SIZE + j * BOX_SIZE + 25,
                    90 + i * BOX_SIZE,
                    BOX_SIZE - 1,
                    BOX_SIZE - 1
                )
            }
        })
    })
}

function draw(canvas, context, game) {
    context.clearRect(0,0, canvas.width, canvas.height)
    drawField(context, game.playField)
    drawTetramino(context, game.currentTetramino)
    drawInfo(context, game)
}

function drawGameOver(canvas, context, game) {
    context.clearRect(0,0, canvas.width, canvas.height)
    context.fillStyle = '#ffffff'
    context.font = '18px serif'
    context.textAlign = 'center'
    context.fillText(`GAME OVER!`, canvas.width / 2, canvas.height / 2 - 50)
    context.font = '16px serif'
    context.fillText(`You score: ${game.score}`, canvas.width / 2, canvas.height / 2 - 20)
    context.font = '12px serif'
    context.fillText(`Please, press Space`, canvas.width / 2, canvas.height / 2 + 60)
    context.fillText(`to restart`, canvas.width / 2, canvas.height / 2 + 80)
}

function update(context, game) {
    if (++game.delay > game.speed) {
        game.currentTetramino.row++
        game.delay = 0

        if (!isValidMove(
            game.currentTetramino.tetramino.structure,
            game.playField,
            game.currentTetramino.row,
            game.currentTetramino.col,
        )) {
            game.currentTetramino.row--
            updateMove(game)
        }
    }
}

function fixTetramino(game) {
    game.currentTetramino.tetramino.structure.forEach((row, i) => {
        row.forEach((item, j) => {
            if (item) {
                if (game.currentTetramino.row + i <= 0) {
                    game.state = 'gameOver'
                    return
                }
                game.playField[
                game.currentTetramino.row + i
                    ][
                game.currentTetramino.col + j
                    ] = game.currentTetramino.tetramino.color
            }
        })
    })
}

function cleanFilledLines(game) {
    let count = 0
    for (let i = game.playField.length - 1; i >= 0;) {
        if (game.playField[i].every(x => !!x)) {
            count++
            for (let j = i; j > 0; j--) {
                for (let z = 0; z < game.playField[j].length; z++) {
                    game.playField[j][z] = game.playField[j - 1][z]
                }
            }
        } else {
            i--
        }
    }

    return count
}

function updateScore(game, score) {
    switch (score) {
        case 1:
            game.score += SCORE[1]
            break
        case 2:
            game.score += SCORE[2]
            break
        case 3:
            game.score += SCORE[3]
            break
        case 4:
            game.score += SCORE[4]
            break
    }
}

function updateLevels(game, score) {
    game.linesLeft -= score
    if (game.linesLeft <= 0) {
        game.level++
        game.linesLeft = LEVELS[game.level].lines
        game.speed = LEVELS[game.level].speed
    }
    let count = 0
    game.playField.forEach((row, i) => {
        let isEmpty = true
        row.forEach((item, j) => {
            if (item) {
                isEmpty = false
                game.playField[i][j] = 0
            }
        })
        count += isEmpty
    })
    game.score += count * BONUS_COMPLETING_LEVEL
}

function updateStatistics(game, score) {
    updateScore(game, score)
    updateLevels(game, score)
}

function updateMove(game) {
    fixTetramino(game)
    const count = cleanFilledLines(game)
    if (count) {
        updateStatistics(game, count)
    }

    game.currentTetramino = game.nextTetramino
    game.nextTetramino = getNextTetromino()
}

function drawPause(canvas, context) {
    context.clearRect(0,0, canvas.width, canvas.height)
    context.fillStyle = '#ffffff'
    context.font = '18px serif'
    context.textAlign = 'center'
    context.fillText('Pause', canvas.width / 2, canvas.height / 2 - 50)
    context.font = '12px serif'
    context.fillText(`Please, press P`, canvas.width / 2, canvas.height / 2 + 60)
    context.fillText('to continue', canvas.width / 2, canvas.height / 2 + 80)
}

function loop(canvas, context, game) {
    switch (game.state) {
        case 'gameOver': {
            drawGameOver(canvas, context, game)
            break
        }
        case 'active': {
            draw(canvas, context, game)
            update(context, game)
            requestAnimationFrame(() => loop(canvas, context, game))
            break
        }
        case 'pause': {
            drawPause(canvas, context)
            break
        }
        default:
            console.error('Invalid game state')
    }
}

function isValidMove(tetramino, playField, newRow, newColumn) {
    for (let i = 0; i < tetramino.length; i++) {
        const row = tetramino[i]
        for (let j = 0; j < row.length; j++) {
            if (row[j] && (
                newColumn + j < 0 ||
                newColumn + j >= playField[0].length ||
                newRow + i >= playField.length ||
                playField[newRow + i][newColumn + j]
            )) {
                return false
            }
        }
    }
    return true
}

function moveEvent(event, game) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const column = event.key === 'ArrowLeft'
            ? game.currentTetramino.col - 1
            : game.currentTetramino.col + 1

        if (isValidMove(
            game.currentTetramino.tetramino.structure,
            game.playField,
            game.currentTetramino.row,
            column,
        )) {
            game.currentTetramino.col = column
        }
    }
}

function rotateEvent(game, event) {
    if (event.key === 'ArrowUp') {
        const newTetraminoStructure = rotate(game.currentTetramino.tetramino.structure)
        if (isValidMove(
            newTetraminoStructure,
            game.playField,
            game.currentTetramino.row,
            game.currentTetramino.col,
        )) {
            game.currentTetramino.tetramino.structure = newTetraminoStructure
        }
    }
}

function boostEvent(game, event) {
    if (event.key === 'ArrowDown') {
        const row = game.currentTetramino.row + 1
        if (isValidMove(
            game.currentTetramino.tetramino.structure,
            game.playField,
            row,
            game.currentTetramino.col,
        )) {
            game.currentTetramino.row = row
        } else {
            game.currentTetramino.row = row - 1
            updateMove(game)
        }
    }
}

function pauseEvent(canvas, context, game, event) {
    if (event.code === 'KeyP') {
        if (game.state === 'active') {
            game.state = 'pause'
        } else {
            game.state = 'active'
            loop(canvas, context, game)
        }
    }
}

function restartEvent(event) {
    if (event.code === 'Space') {
        init()
    }
}

function initEventListener(canvas, context, game) {
    document.addEventListener('keydown', event => {
        switch (game.state) {
            case 'active': {
                moveEvent(event, game)
                rotateEvent(game, event)
                boostEvent(game, event)
                pauseEvent(canvas, context, game, event)
                break
            }
            case 'gameOver': {
                restartEvent(event)
                break
            }
            case 'pause': {
                pauseEvent(canvas, context, game, event)
                break
            }
        }
    })
}

function init() {
    const canvas = initCanvas()
    const context = canvas.getContext('2d')
    const game = initGame()
    initEventListener(canvas, context, game)
    loop(canvas, context, game)
}

init()
