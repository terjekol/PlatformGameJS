class KeyHandler {
    constructor(isKeyUp, keys) {
        this.isKeyUp = isKeyUp
        this.keys = keys
    }

    handleKey(event) {
        const key = event.key

        if (!key.startsWith('Arrow')) return

        if (this.isKeyUp) {
            this.keys.delete(key)
        } else {
            this.keys.add(key)
        }

        event.preventDefault()
    }
}
