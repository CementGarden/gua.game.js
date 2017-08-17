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
            var name = `b${i}`
            var t = game.textureByName(name)
            this.animations['bird'].push(t)
        }
        // for (var i = 1; i < 4; i++) {
        //     var name = `bird2_${i}`
        //     var t = game.textureByName(name)
        //     this.animations['bird2'].push(t)
        // }
        this.animationName = 'bird'
        // log('frames', this.frames())
        this.texture = this.frames()[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3

        this.flipX = false
        this.rotation = 0

        // 重力
        this.gy = 20
        this.vy = 0
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        // log('here')
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -15
        this.rotation = -45
    }
    update() {
        // 受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 576
        if (this.y > h) {
            this.y = h
        }

        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }

        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        // log('context', context)
        context.save()

        var w2 = this.w / 2
        var h2 = this.h / 2
        // log('w2, h2', w2, h2)
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2, -h2)

        context.drawImage(this.texture, 0, 0)

        context.restore()


        // this.game.drawImage(this)
    }
    move(x, keyStatus) {
        this.flipX = (x < 0)
        this.x += x
        // var animationNames = {
        //     down: 'bird',
        //     up: 'bird2',
        // }
        // var name = animationNames[keyStatus]
        // this.changeAnimation(name)
    }
    // changeAnimation(name) {
    //     this.animationName = name
    // }
}
