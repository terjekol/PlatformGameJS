function handleKey(isKeyDown, event, gameModel) {
    const key = event.key

    if (!key.startsWith('Arrow')) return

    if (isKeyDown) {
        gameModel.keys.add(key)
    } else {
        gameModel.keys.delete(key)
    }

    event.preventDefault()
}
