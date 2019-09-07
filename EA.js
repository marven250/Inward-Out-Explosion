//////////////////////////////////////////////////////////////////////////////////////////////////////////
var ctx, init
var projectiles = []
var emoji = {
    explosion: "X",
    projectiles: ["A", "B", "C", "D", "E", "F", "G", "H"]
}
canvasSetUp()
render()


function canvasSetUp() {
    ctx = document.querySelector("canvas").getContext("2d")
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    // if (!init) {
    //     window.addEventListener("resize", function () {
    //         canvasSetUp()
    //         init = true
    //     })
    // }
}


function render() {
    setTimeout(render, 1000 / 60)
    

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    generateProjectiles()
    for (var projectile of projectiles) {
        projectile.draw()
        projectile.move()
    }

    drawEmoji({
        emoji: emoji.explosion,
        x: ctx.canvas.width / 2,
        y: ctx.canvas.height / 2,
        size: 100
    })
}

function generateProjectiles() {
    projectiles = projectiles.filter(function (e) {
        return e.life > 0
    })
    if (Math.random() < 0.175) {
        projectiles.push(createProjectile())
    }
}


function createProjectile() {
    return {
        emoji: emoji.projectiles[Math.floor(emoji.projectiles.length * Math.random())],
        size: Math.random() * 25 + 25,
        seed: 4,
        direction: Math.floor(Math.random() * 180) + 180,
        angle: 0,
        x: ctx.canvas.width / 2,
        y: ctx.canvas.height / 2,
        spin: 0.01,
        life: 60,
        maxLife: 60,
        move: function () {
            this.life -= 1;
            var speed = Math.ceil(this.life / this.maxLife * this.seed)
            var toRadians = this.direction / 180 * 3 * Math.PI
            this.x += speed * Math.cos(toRadians)
            this.y += speed * Math.sin(toRadians)
            this.angle += this.spin
        },
        draw: function () {
            drawEmoji({
                emoji: this.emoji,
                x: this.x,
                y: this.y,
                size: this.size,
                angle: this.angle,
                alpha: this.life / this.maxLife
            })
        }
    }
}


function drawEmoji(info) {
    ctx.font = info.size + "px arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.save()
    ctx.globalAlpha = info.alpha || 1
    ctx.translate(info.x, info.y)
    ctx.rotate(info.angle)
    ctx.fillText(info.emoji, 0, 0)
    ctx.restore()
}
