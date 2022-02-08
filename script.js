var force_x = 2.00
var force_y = -2.00
var points  = 0
var text_   = false

var force_y_text  = {}
var force_x_text  = {}
var ball_pos_text = {}
var point_text    = {}

function dead() {

    add([
        pos(1280/2-100, 240),
        text("Complete", { 
            size: 42,
            width: 400,
            font: "sink"
        })
    ])

    const btn = add([
        pos(1280/2-40, 290),
        area({ cursor: "pointer", }),
        text("New game", { 
            size: 20,
            width: 400,
            font: "sink"
        })
    ])

    btn.onClick(main)
}

function main() {
    const world = kaboom({
        width: 1280,
        height: 720,
        font: "sinko",
        background: [ 0, 0, 0 ],
        canvas: document.querySelector("#canvas")
    })

    const ball = add([
        pos(1280/2-20, 720/2-20),
        "ball",
        rect(20, 20),
        color(252, 3, 3),
        area(),
    ])

    const player1 = add([
        pos(20, 720/2-100),
        "player1",
        rect(20, 170),
        area(),
    ])

    const player2 = add([
        pos(1280-40, 720/2-100),
        "player2",
        rect(20, 170),
        area(),
    ])

    point_text = add([
        pos(1115, 20),
        text("Points " + points, { 
            size: 24,
            width: 400,
            font: "sink"
        })
    ])

    onKeyDown("f3", () => {
        if (text_ != true) {
            text_ = true
            force_x_text = add([
                pos(15, 100-90),
                text("Force X: " + force_x, { 
                    size: 13,
                    width: 400,
                    font: "sink"
                })
            ])
            force_y_text = add([
                pos(15, 115-87),
                text("Force Y: " + force_y, { 
                    size: 13,
                    width: 400,
                    font: "sink"
                })
            ])
            ball_pos_text = add([
                pos(15, 115-87+17),
                text("Ball position: Y:" + ball.pos.y+" X:" + ball.pos.x, { 
                    size: 13,
                    width: 400,
                    font: "sink"
                })
            ])
        }
    })

    // console.log(player1.get())

    onKeyDown("s", () => {
        if (player1.pos.y != 521)
            player1.pos.y += 3
    })
    onKeyDown("w", () => {
        if (player1.pos.y != 32)
            player1.pos.y -= 3
    })

    onKeyDown("up", () => {
        if (player2.pos.y != 32)
            player2.pos.y -= 3
    })

    onKeyDown("down", () => {
        if (player2.pos.y != 521)
            player2.pos.y += 3
    })

    onUpdate(() => {
        point_text.text = "Points " + points 

        if (ball.pos.x == -90 || ball.pos.x == 1280+20) {
            destroy(ball)
            destroy(player1)
            destroy(player2)
            destroy(point_text)
            dead();
        }

        console.log(ball.pos.x)

        if (ball.pos.y == 29 || ball.pos.y == 28) {
            force_y = 2
            ball.pos.y = 31
        } else if (ball.pos.y == 683) {
            force_y = -2
            ball.pos.y = 681
        }

        ball.pos.x += force_x
        ball.pos.y += force_y

        if (text_ == true) {
            force_y_text.text = "Force Y: " + force_y
            force_x_text.text = "Force X: " + force_x
            ball_pos_text.text = "Ball position: Y:" + ball.pos.y+" X:" + ball.pos.x
        }
    })

    onCollide("ball", "player1", () => {
        points++
        force_x = 2
    })

    onCollide("ball", "player2", () => {
        points++
        force_x = -2
    })
}

window.onload = main