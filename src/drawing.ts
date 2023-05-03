import Settings from "./settings"
import {Colony, Explosion, Projectile, Target} from "./objects";
import Colours from "./colours";

export function clear(context: CanvasRenderingContext2D) {
    context.clearRect(0,0, Settings.SCREEN_WIDTH, Settings.SCREEN_WIDTH)
}

export function drawBackground(context: CanvasRenderingContext2D) {
    // SKY
    let skyGradient = context.createLinearGradient(0, 0, 0, 500)
    skyGradient.addColorStop(0, "#0F1E46")
    skyGradient.addColorStop(1, "#1D3985")
    context.fillStyle = skyGradient
    context.fillRect(0, 0, 600, 500)

    // MOUNTAINS
    let mountains = [
        { x1: 30, y1: 390, x2: -40, y2: 500, x3: 130, y3: 500 },
        { x1: 180, y1: 400, x2: 60, y2: 500, x3: 260, y3: 500 },
        { x1: 220, y1: 410, x2: 80, y2: 500, x3: 290, y3: 500 },
        { x1: 280, y1: 410, x2: 170, y2: 500, x3: 340, y3: 500 },
        { x1: 312, y1: 410, x2: 210, y2: 500, x3: 420, y3: 500 },
        { x1: 420, y1: 372, x2: 300, y2: 500, x3: 520, y3: 500 },
        { x1: 80, y1: 370, x2: -20, y2: 500, x3: 170, y3: 500 },
        { x1: 480, y1: 380, x2: 380, y2: 500, x3: 580, y3: 500 },
        { x1: 540, y1: 360, x2: 440, y2: 500, x3: 630, y3: 500 },
    ]

    mountains.map(mountain => {
        context.beginPath()
        context.moveTo(mountain.x1, mountain.y1)
        context.lineTo(mountain.x2, mountain.y2)
        context.lineTo(mountain.x3, mountain.y3)
        context.closePath()
        context.fillStyle = '#666'
        context.fill()
    })

    // GROUND
    let groundGradient = context.createLinearGradient(0, 500, 0, 600)
    groundGradient.addColorStop(0, "#8d773d")
    groundGradient.addColorStop(1, "#a39263")
    context.fillStyle = groundGradient
    context.fillRect(0, 500, 600, 600)

    // DARK MATTERS WEAPON
    context.beginPath()
    context.moveTo(300, 470)
    context.lineTo(265, 525)
    context.lineTo(335, 525)
    context.closePath()
    context.fillStyle = '#fff'
    context.fill()
    context.lineWidth = 1
    context.strokeStyle = '#333'
    context.stroke()
    context.beginPath()
    context.arc(300, 500, 30, 0, 2 * Math.PI, false)
    context.fillStyle = '#fff'
    context.fill()
    context.lineWidth = 1
    context.strokeStyle = '#333'
    context.stroke()
    context.beginPath()
    context.arc(300, 500, 10, 0, 2 * Math.PI, false)
    context.lineWidth = 2
    context.strokeStyle = "#333"
    context.stroke()
}

export function drawColonies(context: CanvasRenderingContext2D, colonies: Colony[]) {
    colonies.map(colony => {
        context.beginPath()
        context.rect(colony.x, colony.y, 80, 40)
        context.fillStyle = "#fff"
        context.fill()
        context.closePath()
        context.lineWidth = 1
        context.strokeStyle = '#333'
        context.stroke()
    })
}

export function drawTargets(context: CanvasRenderingContext2D, targets: Target[]) {
    targets.map((target) => {
        context.lineWidth = 3
        context.strokeStyle = Colours.YELLOW

        context.beginPath()
        context.arc(target.x, target.y, 15, 1.05 * Math.PI, 1.45 * Math.PI, false)
        context.stroke()

        context.beginPath()
        context.arc(target.x, target.y, 15, 1.55 * Math.PI, 1.95 * Math.PI, false)
        context.stroke()

        context.beginPath()
        context.arc(target.x, target.y, 15, 2.05 * Math.PI, 2.45 * Math.PI, false)
        context.stroke()

        context.beginPath()
        context.arc(target.x, target.y, 15, 2.55 * Math.PI, 2.95 * Math.PI, false)
        context.stroke()
    })
}

export function drawCircles(
    context: CanvasRenderingContext2D,
    circles: Projectile[]|Explosion[],
    fillStyle: string,
    strokeColor: string
) {
    circles.map((circle: Projectile|Explosion) => {
        context.beginPath()
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false)
        context.fillStyle = fillStyle
        context.fill()
        context.lineWidth = 3
        context.strokeStyle = strokeColor
        context.stroke()
    })
}

export function drawUI(context: CanvasRenderingContext2D, wave: number, score: number, ammo: number) {
    context.font = "16px Arial"
    context.textAlign = "center"
    context.fillStyle = Colours.YELLOW
    context.fillText("Wave", 100, 30)
    context.fillText(String(wave), 100, 50)
    context.fillText("Score", 500, 30)
    context.fillText(String(score), 500, 50)
    context.fillText("Ammo", 300, 560)
    context.fillText(String(ammo), 300, 580)
}
