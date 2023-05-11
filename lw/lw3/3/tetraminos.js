import {getRandomInt} from './utils.js'

const tetraminos = new Map([
    ['I', {
        id: 'I',
        structure: [
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0],
            [0,1,0,0]
        ],
        color: '#00f0f0',
    }],
    ['J', {
        id: 'J',
        structure: [
            [0,1,0],
            [0,1,0],
            [1,1,0],
        ],
        color: '#0000f0',
    }],
    ['L', {
        id: 'L',
        structure: [
            [0,1,0],
            [0,1,0],
            [0,1,1],
        ],
        color: '#f0a100',
    }],
    ['O', {
        id: 'O',
        structure: [
            [1,1],
            [1,1],
        ],
        color: '#f0f000',
    }],
    ['S', {
        id: 'S',
        structure: [
            [0,1,1],
            [1,1,0],
            [0,0,0],
        ],
        color: '#00f000',
    }],
    ['T', {
        id: 'T',
        structure: [
            [1,1,1],
            [0,1,0],
            [0,0,0],
        ],
        color: '#a100f0',
    }],
    ['Z', {
        id: 'Z',
        structure: [
            [1,1,0],
            [0,1,1],
            [0,0,0],
        ],
        color: '#f00000',
    }],
])

function getTetramino(id) {
    return {
        ...tetraminos.get(id)
    }
}

function getRandomTetramino() {
    return getTetramino(['I', 'J', 'L', 'O', 'S', 'T', 'Z'][getRandomInt(7)])
}

export {
    getTetramino,
    getRandomTetramino,
}
