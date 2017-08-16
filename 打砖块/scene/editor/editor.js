var Editor = function(game) {
    var s = {
        game: game,
    }
    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0
	var blockWidth = 40
	var blockHeight = 20
	var start = false

    var blocks = loadEditorLevel(game, 1)


    game.registerAction('a', function(){
		if (start) {
	        paddle.moveLeft()
		}
    })
    game.registerAction('d', function(){
		if (start) {
	        paddle.moveRight()
		}
    })
    game.registerAction('f', function(){
		if (start) {
			log('fire')
	        ball.fire()
		}
    })
    game.registerAction('p', function(){

		start = true
		window.paused = false
		// levels[3] = editorLevels[0]
		// var s = Scene(game, 4)
		// game.replaceScene(s)
    })

    s.draw = function() {
        // draw 背景
        game.context.fillStyle = "#554"
        game.context.fillRect(0, 0, 400, 300)
        // draw
		if (start) {
	        game.drawImage(paddle)
	        game.drawImage(ball)
		}
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        // draw labels
        game.context.fillText('分数: ' + score, 10, 290)
		// TODO 文字显示不出来
        game.context.fillText('鼠标点击编辑砖块', 10, 290)
    }
    s.update = function() {
        if (window.paused) {
            return
        }
        if (!start) {
            return
        }
		log('runloop')
        ball.move()
        // 判断游戏结束
        if (ball.y > paddle.y) {
            // 跳转到 游戏结束 的场景
            var end = SceneEnd.new(game)
            game.replaceScene(end)
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                // log('block 相撞')
                block.kill()
                ball.反弹()
                // 更新分数
                score += 100
            }
        }
    }

	// TODO 不知为何会跳三次事件
	game.canvas.addEventListener('mousedown', function(event) {
		if (!start) {
			var x = event.offsetX
		    var y = event.offsetY
			x = Math.floor(x / blockWidth) * blockWidth
			y = Math.floor(y / blockHeight) * blockHeight
		    log(x, y, event)

			var index = -1
			for (var i = 0; i < editorLevels[0].length; i++) {
				var b = editorLevels[0][i]
				var equral = [x, y].toString() == b.toString()
				if (equral) {
					index = i
				}
			}
			if (index > -1) {
				editorLevels[0].splice(index, 1)
			} else {
				editorLevels[0].push([x, y])
			}

			blocks = loadEditorLevel(game, 1)
			log('blocks', blocks)
		}
	    // 检查是否点中了 ball
	    // if (ball.hasPoint(x, y)) {
	    //     // 设置拖拽状态
	    //     enableDrag = true
	    // }
	})
    // mouse event
    // var enableDrag = false
    // game.canvas.addEventListener('mousedown', function(event) {
    //     var x = event.offsetX
    //     var y = event.offsetY
    //     log(x, y, event)
    //     // 检查是否点中了 ball
    //     if (ball.hasPoint(x, y)) {
    //         // 设置拖拽状态
    //         enableDrag = true
    //     }
    // })
    // game.canvas.addEventListener('mousemove', function(event) {
    //     var x = event.offsetX
    //     var y = event.offsetY
    //     // log(x, y, 'move')
    //     if (enableDrag) {
    //         log(x, y, 'drag')
    //         ball.x = x
    //         ball.y = y
    //     }
    // })
    // game.canvas.addEventListener('mouseup', function(event) {
    //     var x = event.offsetX
    //     var y = event.offsetY
    //     log(x, y, 'up')
    //     enableDrag = false
    // })

    return s
}
