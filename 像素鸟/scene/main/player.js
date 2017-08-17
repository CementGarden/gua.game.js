class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
		// this.image = game.textureByName(this.name)
        this.setup()
    }
    setup() {
        this.speed = 20
		this.duration = 25
    }
    update() {
		this.duration--
        this.x += this.speed
    }
	// collide(e) {
	// 	// log('block', o.alive, b)
	// 	return (rectIntersects(e, this) || rectIntersects(this, e))
	// }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 10
        this.cooldown = 0
		this.bullets = []
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = 5
            var x = this.x + this.w
            var y = this.y + this.h / 2
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            // this.scene.addElement(b)
			this.bullets.push(b)
        }
    }
    update() {
        if (this.cooldown > 0) {
            this.cooldown--
        }
        // 更新所有系统
        for (var b of this.bullets) {
            b.update()
        }
        // 删除火花
        this.bullets = this.bullets.filter(b => b.duration > 0)
    }
    draw() {
		super.draw()
        for (var b of this.bullets) {
            b.draw()
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}
