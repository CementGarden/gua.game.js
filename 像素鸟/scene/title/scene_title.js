class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.gapSpace = 200
        this.columsOfPipe = 3
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.gapSpace
            var p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    update() {
        // log('pipes', this.pipes)
        for (var i = 0; i < this.pipes.length; i += 2) {
            var p1 = this.pipes[i]
            var p2 = this.pipes[i+1]
            p1.x -= 5
            p2.x -= 5
            if (p1.x < -100) {
                p1.x += this.gapSpace * this.columsOfPipe
            }
            if (p2.x < -100) {
                p2.x += this.gapSpace * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            // log('context', context)
            context.save()

            var w2 = p.w / 2
            var h2 = p.h / 2
            // log('w2, h2', w2, h2)
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)

            context.drawImage(p.texture, 0, 0)

            context.restore()
        }
    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        var game = this.game
        this.elements = []
        this.start = false
        this.end = false

        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 2; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 336 - 50
            g.y = 600
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5
        // player
        var b = GuaAnimation.new(game)
        b.x = 50
        b.y = 250
        this.bird = b
        this.addElement(b)

        // title
        var t = GuaImage.new(game, 'title')
        t.x = 100
        t.y = 200
        this.addElement(t)

        this.setupInputs()
        // var ps = GuaParticleSystem.new(game)
        //
        // this.addElement(ps)
    }
    gameover() {
        this.end = true
        var over = GuaImage.new(this.game, 'over')
        over.x = 100
        over.y = 250
        this.addElement(over)
    }
    update() {
        // log('start', this.start)
        if (!this.start || this.end) {
            return
        }
        super.update()
        var offset = -5
        // 地面移动
        this.skipCount--
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 2; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
        // log(this.pipe.pipes)
        var b = this.bird
        for (var p of this.pipe.pipes) {
            var collision = rectIntersects(b, p)
            // log('collision', collision)
            if (collision) {
                this.gameover()
                // log(this.end)
            }
        }
        if (b.y >= 576) {
            this.gameover()
        }
    }
    setupInputs() {
        var self = this
        var b = this.bird
        // self.game.registerAction('a', function(keyStatus) {
        //     b.move(-2, keyStatus)
        // })
        // self.game.registerAction('d', function(keyStatus) {
        //     b.move(2, keyStatus)
        // })
        self.game.registerAction('j', function(keyStatus) {
            self.start = true
            for (var i = 0; i < self.elements.length; i++) {
                e = self.elements[i]
                if (e.name == 'title') {
                    self.elements.splice(i, 1)
                }
            }
            b.jump()
        })
        self.game.registerAction('r', function(keyStatus) {
            if (self.end == true) {
                self.setup()
            }
        })
    }
    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)
    }
}
