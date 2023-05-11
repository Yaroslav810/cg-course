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
        lines: 10,
        speed: 35,
    },
    2: {
        lines: 15,
        speed: 30,
    },
    3: {
        lines: 20,
        speed: 25,
    },
    4: {
        lines: 25,
        speed: 20,
    },
    5: {
        lines: 30,
        speed: 15,
    },
    6: {
        lines: 35,
        speed: 10,
    },
    7: {
        lines: 40,
        speed: 5,
    },
    8: {
        lines: 45,
        speed: 4,
    },
    9: {
        lines: 50,
        speed: 3,
    },
    10: {
        lines: 100,
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
