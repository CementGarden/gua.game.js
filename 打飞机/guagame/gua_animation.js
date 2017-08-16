class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，这里硬编码一套动画
        this.animations = {
            bird: [],
            bird2: [],
        }
        // this.frames = []
        for (var i = 1; i < 4; i++) {
            var name = `bird${i}`
            var t = game.textureByName(name)
            this.animations['bird'].push(t)
        }
        for (var i = 1; i < 4; i++) {
            var name = `bird2_${i}`
            var t = game.textureByName(name)
            this.animations['bird2'].push(t)
        }
        this.animationName = 'bird'
        // log('frames', this.frames())
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 3
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        // log('here')
        return this.animations[this.animationName]
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        this.game.drawImage(this)
    }
    move(x, keyStatus) {
        this.x += x
        var animationNames = {
            down: 'bird',
            up: 'bird2',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }
}
