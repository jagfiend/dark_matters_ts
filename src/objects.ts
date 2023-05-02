class Entity {
    x: number
    y: number
    removeMe: boolean

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.removeMe = false
    }
}

export class Colony extends Entity {
    constructor(x: number, y: number) {
        super(x, y)
    }
}

export class Target extends Entity {
    constructor(x: number, y: number) {
        super(x, y)
    }
}

export class Projectile extends Entity {
    radius: number

    constructor(x: number, y: number) {
        super(x, y)
        this.radius = 10
    }
}

export class Missile extends Entity {
    velX: number
    velY: number
    radius: number

    constructor(x: number, y: number, velX: number, velY: number) {
        super(x, y);
        this.velX = velX
        this.velY = velY
        this.radius = 10
    }
}

export class Explosion extends Entity {
    radius: number
    counter: number

    constructor(x: number, y: number, radius: number = 10, counter: number = 0) {
        super(x, y)
        this.radius = radius
        this.counter = counter
    }
}
