class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 1)
        var name = 'enemy' + type
        super(game, name)
		// this.image = game.textureByName(this.name)
		// log('this.texture', this.texture)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(500, 600)
        this.y = randomBetween(0, 400)
		this.alive = true
    }
    update() {
        this.x -= this.speed
        if (this.x < -36) {
            this.setup()
        }
    }
}
