class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        this.game.context.fillText(this.text, 100, 190)
    }
    update() {

    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var label = GuaLabel.new(game, 'hello')
        this.addElement(label)
        // game.registerAction('k', function(){
        //     var s = Scene.new(game)
        //     game.replaceScene(s)
        // })

        var w = GuaAnimation.new(game)
        w.x = 100
        w.y = 200
        this.w = w
        this.addElement(w)

        this.setupInputs()
        // var ps = GuaParticleSystem.new(game)
        //
        // this.addElement(ps)
    }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function(keyStatus) {
            self.w.move(-2, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            self.w.move(2, keyStatus)
        })
    }
    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 190)
    }
}
