import './style.css'
import { clear } from './drawing'
import Settings from './settings'
import Game from './game'
import {Projectile, Target} from "./objects";

window.addEventListener('load', function () {
    const canvas: HTMLElement | null = document.getElementById('game')
    // @ts-ignore
    canvas.width = Settings.SCREEN_WIDTH
    // @ts-ignore
    canvas.height = Settings.SCREEN_HEIGHT
    // @ts-ignore
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
    // @ts-ignore
    const bounds = canvas.getBoundingClientRect()
    const game = new Game(Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT)

    // @ts-ignore
    canvas.addEventListener('click', function(e) {
        let clickPos = {
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top,
        };

        if (game.ammo > 0 && clickPos.y < 450) {
            game.targets.push(new Target(clickPos.x, clickPos.y));
            game.playerProjectiles.push(new Projectile(300, 500));
            game.ammo--;
        }
    })

    let lastTime: number = 0

    function animate(timestamp: number) {
        let deltaTime = timestamp - lastTime
        lastTime = timestamp

        if (game.isDead) {
            alert("Game over, you scored: " + game.score);
            return;
        }

        game.counter++

        clear(ctx)
        game.update()
        game.draw(ctx)
        requestAnimationFrame(animate)
    }

    animate(0)
})
