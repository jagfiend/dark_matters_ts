import {drawBackground, drawColonies, drawTargets, drawCircles, drawUI} from "./drawing";
import {Colony, Explosion, Missile, Projectile, Target} from "./objects";
import Colours from "./colours";

export default class Game {
    width: number
    height: number
    score: number
    wave: number
    ammo: number
    counter: number
    salvo: number
    targets: Target[]
    playerProjectiles: Projectile[]
    projectileExplosions: Explosion[]
    missiles: Missile[]
    missileExplosions: Explosion[]
    colonies: Colony[]
    isDead: boolean
    timer: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height

        this.score = 0
        this.wave = 1
        this.ammo = 12
        this.counter = 0
        this.salvo = 6

        this.targets = []
        this.playerProjectiles = []
        this.projectileExplosions = []
        this.missiles = []
        this.missileExplosions = []

        this.colonies = [
            new Colony(35, 480),
            new Colony(160, 480),
            new Colony(360, 480),
            new Colony(485, 480),
        ]

        this.isDead = false
        this.timer = 0
    }

    update (deltaTime: number) {
        // player stuff
        // projectiles and targets
        for (let i = this.playerProjectiles.length - 1; i >= 0; i--) {
            let dx = this.playerProjectiles[i].x - this.targets[i].x
            let dy = this.playerProjectiles[i].y - this.targets[i].y
            let distanceToTarget = Math.sqrt((dx * dx) + (dy * dy))
            let scale = 7.5 / distanceToTarget

            if (distanceToTarget > 5) {
                this.playerProjectiles[i].x -= dx * scale
                this.playerProjectiles[i].y -= dy * scale
            } else {
                this.projectileExplosions.push(new Explosion(this.targets[i].x, this.targets[i].y))
                this.playerProjectiles.splice(i, 1)
                this.targets.splice(i, 1)
            }
        }

        // project explosions
        this.updateExplosions(this.projectileExplosions)

        // enemy stuff
        // waves
        if (this.counter === 30) {
            console.log('first wave')
            this.createMissileSalvo(this.salvo)
        }

        if (this.counter != 0 && this.counter % 360 == 0) {
            console.log('new wave')
            this.wave++
            this.score += 10000 + (2500 * this.colonies.length)
            this.ammo += 6
            this.salvo += 3
            this.createMissileSalvo(this.salvo)
        }

        this.counter++

        // if (this.timer > 10) {
        //     this.timer = 0
        //     this.counter++
        // } else {
        //     this.timer += deltaTime
        // }

        // missiles
        for (let i = this.missiles.length - 1; i >= 0; i--) {
            let _missile = this.missiles[i]
            _missile.y += _missile.velY
            _missile.x += _missile.velX

            if (_missile.y >= 510) {
                this.missiles.splice(i, 1)
                this.missileExplosions.push(new Explosion(_missile.x, 510))
                return
            } else if (_missile.x <= -15 || _missile.x >= 615) {
                this.missiles.splice(i, 1)
                return
            }

            let hitProjectileExplosion = this.explosionCollisionHandler(i, _missile.x, _missile.y, _missile.radius)

            if (!hitProjectileExplosion ) {
                this.checkForColonyCollision(i, _missile.x, _missile.y)
            }
        }

        // missile explosions
        this.updateExplosions(this.missileExplosions)

        // grim reaper
        if (this.colonies.length === 0) {
            this.isDead = true
        }
    }

    createMissileSalvo(salvo: number) {
        for (let i = 0; i < salvo; i++) {
            let roundedRandomNumber1 = Math.round(Math.random() * 100)
            let roundedRandomNumber2 = Math.round(Math.random() * 100)
            let directionModifier = roundedRandomNumber1 % 2 == 0 ? 1 : -1

            this.missiles.push(
                new Missile(
                    150 + (roundedRandomNumber1 * 5),
                    -1 * (roundedRandomNumber1 * 4),
                    directionModifier * roundedRandomNumber2 / 40,
                    2,
                )
            )
        }
    }

    updateExplosions(arr: Explosion[]) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].counter <= 30) {
                arr[i].radius += 2
            } else if (arr[i].counter <= 60) {
                arr[i].radius = 60
            } else if (arr[i].counter <= 89) {
                arr[i].radius -= 2
            } else if (arr[i].counter >= 90) {
                arr[i].radius = 0
                arr[i].removeMe = true
            }
            arr[i].counter++
            if (arr[i].removeMe) {
                arr.splice(i, 1)
            }
        }
    }

    explosionCollisionHandler(missileIndex: number, missileX: number, missileY: number, missileRadius: number) {
        for (let i = this.projectileExplosions.length - 1; i >= 0; i--) {
            if (!this.projectileExplosions[i]) {
                continue
            }

            let dx = missileX - this.projectileExplosions[i].x
            let dy = missileY - this.projectileExplosions[i].y
            let distanceToProjectileExplosion = Math.sqrt((dx * dx) + (dy * dy))
            let sumOfRadii = missileRadius + this.projectileExplosions[i].radius

            if (distanceToProjectileExplosion <= sumOfRadii) {
                this.missileExplosions.push(new Explosion(missileX, missileY))
                this.missiles.splice(missileIndex, 1)
                this.score += 200
                return true
            }
        }
        return false
    }

    checkForColonyCollision(missileIndex: number, missileX: number, missileY: number) {
        for (let i = this.colonies.length - 1; i >= 0; i--) {
            let colony = this.colonies[i]

            if (missileX > colony.x && missileX < colony.x + 80 && missileY > colony.y && missileY < colony.y + 40) {
                this.missileExplosions.push(new Explosion(missileX, missileY))
                this.missiles.splice(missileIndex, 1)
                this.colonies.splice(i, 1)
            }
        }
    }

    draw(context: CanvasRenderingContext2D) {
        drawBackground(context)
        drawColonies(context, this.colonies)
        // player stuff...
        drawTargets(context, this.targets)
        drawCircles(context, this.missiles, Colours.DARK_GREY, Colours.RED)
        drawCircles(context, this.missileExplosions, Colours.DARK_GREY, Colours.RED)
        // enemy stuff...
        drawCircles(context, this.playerProjectiles, Colours.DARK_GREY, Colours.BLUE)
        drawCircles(context, this.projectileExplosions, Colours.DARK_GREY, Colours.BLUE)
        drawUI(context, this.wave, this.score, this.ammo)
    }
}
