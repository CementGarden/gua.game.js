var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            // blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        bullet: 'img/bullet.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        fire: 'img/fire.png',
        bird1: 'img/bird/bird1.png',
        bird2: 'img/bird/bird2.png',
        bird3: 'img/bird/bird3.png',
        bird4: 'img/bird/bird4.png',
        bird2_1: 'img/bird2/bird1.png',
        bird2_2: 'img/bird2/bird2.png',
        bird2_3: 'img/bird2/bird3.png',
        bird2_4: 'img/bird2/bird4.png',
    }
    var game = GuaGame.instance(30, images, function(g){
        var s = Scene.new(g)
        // var s = SceneTitle.new(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
