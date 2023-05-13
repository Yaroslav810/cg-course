const WIDTH = 10
const HEIGHT = 20

const BOX_SIZE = 10

const SCORE = {
    1: 10,
    2: 30,
    3: 70,
    4: 150,
}

const LEVELS = {
    1: {
        lines: 5,
        speed: 40,
    },
    2: {
        lines: 5,
        speed: 30,
    },
    3: {
        lines: 10,
        speed: 20,
    },
    4: {
        lines: 10,
        speed: 15,
    },
    5: {
        lines: 15,
        speed: 10,
    },
    6: {
        lines: 15,
        speed: 5,
    },
    7: {
        lines: 20,
        speed: 4,
    },
    8: {
        lines: 20,
        speed: 3,
    },
    9: {
        lines: 30,
        speed: 2,
    },
    10: {
        lines: 50,
        speed: 1,
    },
}

const BONUS_COMPLETING_LEVEL = 10

export {
    WIDTH,
    HEIGHT,

    BOX_SIZE,

    SCORE,
    LEVELS,
    BONUS_COMPLETING_LEVEL,
}
