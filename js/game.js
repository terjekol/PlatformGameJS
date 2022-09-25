function runGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;
    const gameModel = initGameModel();
    window.addEventListener('keydown', e => handleKey(true, e.key, gameModel));
    window.addEventListener('keyup', e => handleKey(false, e.key, gameModel));
}

function initGameModel() {
    return {
        keys: new Set(),
    };
}