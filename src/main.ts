import './style.css'
import { clear } from './drawing'
import Settings from './settings'
import Game from './game'

window.addEventListener('load', function () {
    const canvas: HTMLElement | null = document.getElementById('game')
    // @ts-ignore
    canvas.width = Settings.SCREEN_WIDTH
    // @ts-ignore
    canvas.height = Settings.SCREEN_HEIGHT
    // @ts-ignore
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
    const game = new Game(Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT)

    let lastTime: number = 0

    function animate(timestamp: number) {
        let deltaTime = timestamp - lastTime
        lastTime = timestamp
        clear(ctx)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }

    animate(0)
})
