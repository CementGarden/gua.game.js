class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'sky')

        // this.player = GuaImage.new(game, 'player')
        // this.player.x = 50
        // this.player.y = 150
        this.player = Player.new(game)
        this.player.x = 50
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.player)
        //
        this.addEnemies()
        //
        this.psm = GuaParticleSystemManager.new(game)
        this.addElement(this.psm)
        // this.psm.add(100, 100)
        // var ps = GuaParticleSystem.new(this.game, 100, 100)
        // this.addElement(ps)
    }

    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function(){
            s.player.moveLeft()
        })
        g.registerAction('d', function(){
            s.player.moveRight()
        })
        g.registerAction('w', function(){
            s.player.moveUp()
        })
        g.registerAction('s', function(){
            s.player.moveDown()
        })
        g.registerAction('j', function(){
            s.player.fire()
        })
    }

    update() {
        super.update()
        this.elements = this.elements.filter(e => e.noDraw == undefined)
        // this.psm.add(100, 100)
        // this.player.x += 1
        var es = this.enemies
        var bs = this.player.bullets
        es = es.filter(e => e.alive == true)
        // log(bs)
        // log(es)
        for (var e of es) {
            for (var b of bs) {
                // log('e.x, e.y', e.x, e.y)
                // log('b.x, b.y', b.x, b.y)
                // log('e.image', e.image)
                var hit = (rectIntersects(e, b) || rectIntersects(b, e))
                if (hit) {
                    // log('相撞')
                    // 干掉敌人，给敌人被干掉时加个效果
                    // delete e
                    var eX = e.x + e.texture.width / 2
                    var eY = e.y + e.texture.height / 2
                    this.psm.add(eX, eY)

                    e.noDraw = true
                    e.alive = false
                    // 干掉子弹
                    b.duration = 0
                }
            }
        }
    }
}


// var Scene = function(game, level=1) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//
//     var score = 0
//
//     var blocks = loadLevel(game, level)
//
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         // log(ball)
//         ball.fire()
//     })
//
//     s.draw = function() {
//         // draw 背景
//         game.context.fillStyle = "#554"
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         if (window.paused) {
//             return
//         }
//
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到 游戏结束 的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.反弹()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.反弹()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//
//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, event)
//         // 检查是否点中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, 'move')
//         if (enableDrag) {
//             log(x, y, 'drag')
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, 'up')
//         enableDrag = false
//     })
//
//     return s
// }
