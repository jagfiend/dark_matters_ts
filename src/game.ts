import Player from "./player";

export default class Game {
    readonly width: number;
    readonly height: number;
    readonly player: Player

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.player = new Player(this)
    }

    update (deltaTime: number) {
        this.player.update()
    }

    draw(context: CanvasRenderingContext2D) {
        this.player.draw(context)
    }
}
