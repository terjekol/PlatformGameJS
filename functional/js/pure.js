const pipe = (...functions) => value =>
    functions.reduce((currentValue, fn) => fn(currentValue), value)

const clamp = (value, min, max) =>
    Math.min(Math.max(value, min), max)

const drawAction = (image, objectState, deltaX = 0, meta) => {
    const x = objectState.x + deltaX
    const y = objectState.y

    if (meta === undefined) {
        return { image, x, y }
    }

    const width = meta.width
    const height = meta.height
    const frameX = objectState.spriteIndex * width
    const frameY = objectState.mode * height

    return {
        image,
        x,
        y,
        frameX,
        frameY,
        width,
        height,
    }
}

const getDrawActions = params => {
    const { state, meta } = params
    const background = state.background

    return [
        drawAction('background', background),
        drawAction('background', background, meta.background.width - 1),
        drawAction('enemy', state.enemy, 0, meta.enemy),
        drawAction('player', state.player, 0, meta.player),
        { text: 'Score: ' + Math.floor(state.score) },
    ]
}

const updateBackground = params => {
    const { background } = params.state
    const newX = background.x < -params.meta.background.width
        ? 0
        : background.x + background.speedX

    return {
        ...params,
        state: {
            ...params.state,
            background: {
                ...background,
                x: newX,
            },
        },
    }
}

const updatePlayerSpeedX = params => {
    const speedX = params.keys.right
        ? 5
        : params.keys.left
            ? -5
            : 0

    return {
        ...params,
        state: {
            ...params.state,
            player: {
                ...params.state.player,
                speedX,
            },
        },
    }
}

const isPlayerOnGround = params =>
    params.state.player.y >= params.meta.player.y

const updatePlayerSpeedY = params => {
    if (!params.keys.up || !isPlayerOnGround(params)) {
        return params
    }

    return {
        ...params,
        state: {
            ...params.state,
            player: {
                ...params.state.player,
                speedY: -32,
            },
        },
    }
}

const updatePlayerHorizontalMovement = params => {
    const player = params.state.player
    const newX = clamp(
        player.x + player.speedX,
        0,
        params.meta.game.width - params.meta.player.width
    )

    return {
        ...params,
        state: {
            ...params.state,
            player: {
                ...player,
                x: newX,
            },
        },
    }
}

const updatePlayerVerticalMovement = params => {
    const player = params.state.player
    const newY = clamp(
        player.y + player.speedY,
        0,
        params.meta.player.y
    )

    const speedY = newY >= params.meta.player.y && player.speedY >= 0
        ? 0
        : player.speedY + params.meta.game.downforce

    return {
        ...params,
        state: {
            ...params.state,
            player: {
                ...player,
                y: newY,
                speedY,
            },
        },
    }
}

const updateEnemyHorizontalMovement = params => {
    const enemy = params.state.enemy
    const movedX = enemy.x + enemy.speedX
    const hasLeftScreen = movedX < -params.meta.enemy.width

    const newEnemy = hasLeftScreen
        ? {
            ...enemy,
            x: params.meta.game.width,
            speedX: enemy.speedX - 0.5,
        }
        : {
            ...enemy,
            x: movedX,
        }

    return {
        ...params,
        state: {
            ...params.state,
            enemy: newEnemy,
        },
    }
}

const updateSprite = (objectName, params) => {
    const objectState = params.state[objectName]
    const objectMeta = params.meta[objectName]

    const shouldChangeFrame = objectState.spriteSkipIndex === 3

    const newObjectState = shouldChangeFrame
        ? {
            ...objectState,
            spriteIndex:
                (objectState.spriteIndex + 1) %
                objectMeta.spriteCounts[objectState.mode],
            spriteSkipIndex: 0,
        }
        : {
            ...objectState,
            spriteSkipIndex: objectState.spriteSkipIndex + 1,
        }

    return {
        ...params,
        state: {
            ...params.state,
            [objectName]: newObjectState,
        },
    }
}

const updatePlayerSprite = params =>
    updateSprite('player', params)

const updateEnemySprite = params =>
    updateSprite('enemy', params)

const getEdge = (direction, entity, params) => {
    const objectState = params.state[entity]
    const meta = params.meta[entity]
    const margins = {
        left: 10,
        top: 20,
        right: 30,
        bottom: 20,
    }

    if (direction === 'left') {
        return objectState.x + margins.left
    }

    if (direction === 'right') {
        return objectState.x + meta.width - margins.right
    }

    if (direction === 'bottom') {
        return objectState.y + meta.height - margins.bottom
    }

    return objectState.y + margins.top
}

const checkForCollision = params => {
    const isAboveEnemy =
        getEdge('bottom', 'player', params) <
        getEdge('top', 'enemy', params)

    const isBelowEnemy =
        getEdge('top', 'player', params) >
        getEdge('bottom', 'enemy', params)

    const isToTheRightOfEnemy =
        getEdge('left', 'player', params) >
        getEdge('right', 'enemy', params)

    const isToTheLeftOfEnemy =
        getEdge('right', 'player', params) <
        getEdge('left', 'enemy', params)

    const noCollision =
        isAboveEnemy ||
        isBelowEnemy ||
        isToTheRightOfEnemy ||
        isToTheLeftOfEnemy

    return {
        ...params,
        state: {
            ...params.state,
            isRunning: noCollision,
        },
    }
}

const updateScore = params => ({
    ...params,
    state: {
        ...params.state,
        score: params.state.score + 0.03,
    },
})

const update = pipe(
    updatePlayerSpeedX,
    updatePlayerSpeedY,
    updatePlayerHorizontalMovement,
    updatePlayerVerticalMovement,
    updatePlayerSprite,
    updateEnemyHorizontalMovement,
    updateEnemySprite,
    updateBackground,
    updateScore,
    checkForCollision
)
