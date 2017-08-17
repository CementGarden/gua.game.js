var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    var o1 = a
    var o2 = b
    var hw1 = o1.texture.width / 2
    var hh1 = o1.texture.height / 2
    var hw2 = o2.texture.width / 2
    var hh2 = o2.texture.height / 2
    cen1 = {
        x: o1.x + hw1,
        y: o1.y + hh1,
    },
    cen2 = {
        x: o2.x + hw2,
        y: o2.y + hh2
    };

    return (Math.abs(cen2.x - cen1.x) <= hw1 + hw2) &&
        (Math.abs(cen2.y - cen1.y) <= hh1 + hh2)

    // if (b.y > o.y && b.y < o.y + o.texture.height) {
    //     if (b.x > o.x && b.x < o.x + o.texture.width) {
    //         return true
    //     }
    // }
    // return false
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
