import kaboom from "kaboom"

kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  background: [0, 0, 0],
  clearColor: [0, 0, 0, 1],
  //width: 3000,
  //height: 1000,
})


/*==========================================================================================================
                                           Loading Sprites
==========================================================================================================*/
//load sprites
loadSprite("bean", "/sprites/bean.png")
loadSprite("ghosty", "/sprites/ghosty.png")
loadSprite("spike", "/sprites/spike.png")
loadSprite("grass", "/sprites/grass.png")
loadSprite("prize", "/sprites/jumpy.png")
loadSprite("apple", "/sprites/apple.png")
loadSprite("portal", "/sprites/portal.png")
//loading sprints and sound

loadSound("coin", "/sounds/score.mp3")
loadSound("powerup", "/sounds/powerup.mp3")
loadSound("blip", "/sounds/blip.mp3")
loadSound("hit", "/sounds/hit.mp3")
loadSound("portal", "/sounds/portal.mp3")
loadSound("signal", "/sounds/signal.mp3")
loadSound("death", "/sounds/off.mp3")
loadSound("cyber-music", "/sounds/flowing.mp3")
loadSound("win", "/sounds/WinOst.mp3")
loadSound("lose", "/sounds/gameOver.mp3")
loadSound("intro", "/sounds/aip.mp3")






//Circle Sprite
loadSprite("loop-portal", "/sprites/circle.png")

//Background Screen
loadRoot('https://i.imgur.com/')

//Coin Sprite (coffee beans)
loadSprite("coin", "jAd8Ag1.png")

//Background Screen
loadSprite("bg", "e0BkWVQ.png")

//Jump block
loadSprite("note", "YgS2AXY.png")

//If Sprite
loadSprite("if", "u6d8HCt.png")

//Else Sprite
loadSprite("else", "eWLTjZG.png")

//Red Pill Sprite
loadSprite("red-pill", "pZn55Gj.png")

//Blue Pill Sprite
loadSprite("blue-pill", "hekVe1l.png")

//Player still right Sprite 
loadSprite('player', 'mOQvXzS.png')

//Player walk right Sprite 
loadSprite('player-right-walk', 'uQP7q7K.png')

//Regular Portal
loadSprite('grn', 'kDSgaPG.png')

//Recursive Portal
loadSprite('red', 'iRJhFMV.png')

//Enemy Bug
loadSprite('bug', '3924mdW.png')

//Recursion
loadSprite('rec', "sH0auku.png")

//Sun Power Up Sprite
loadSprite("sun", "mySb9IZ.png")

//Power Up Block
loadSprite("block", "LIiOtqg.png")

//Road Block
loadSprite("road", "FC1gh82.png")

loadSprite("evo", "G0DYdbQ.png.png")
//Game Backgroun
loadSprite("gamebg", "XoPpzwv.png")
//win screen sprite
loadSprite("winscrn", "a9o1mgX.png")
//lose screen
loadSprite("losescrn", "EKK77gG.png")
//Jump left
loadSprite("jl", "En1JsUR.png")
//left walk sprite
loadSprite("left-walk", "9wLaQez.png")
//left stand
loadSprite("left-stand", "duu4F23.png")
//right jump
loadSprite("right-jump", "ootPbgy.png")

add([sprite("bg"), layer("bg")])



// custom component controlling enemy patrol movement
function patrol(speed = 60, dir = 1) {
  return {
    id: "patrol",
    require: ["pos", "area",],
    add() {
      this.on("collide", (obj, col) => {
        if (col.isLeft() || col.isRight()) {
          dir = -dir
        }
      })
    },
    update() {
      this.move(speed * dir, 0)
    },
  }
}

// custom component that makes stuff grow big
function big() {
  let timer = 0
  let isBig = false
  let destScale = 1
  return {
    // component id / name
    id: "big",
    // it requires the scale component
    require: ["scale"],
    // this runs every frame
    update() {
      if (isBig) {
        timer -= dt()
        if (timer <= 0) {
          this.smallify()
        }
      }
      this.scale = this.scale.lerp(vec2(destScale), dt() * 6)
    },
    // custom methods
    isBig() {
      return isBig
    },
    smallify() {
      destScale = 1
      timer = 0
      isBig = false
    },
    biggify(time) {
      destScale = 2
      timer = time
      isBig = true
    },
  }
}

// define some constants
const JUMP_FORCE = 1320
const MOVE_SPEED = 480
const FALL_DEATH = 2400

const LEVELS = [
  /* 
    ====================================================================
                              All levels
    ====================================================================
  */


  [//if-else Level
    "                                                                          ",
    "                                                                          ",
    "       ª       >                                   >                  º   ",
    "       ======================                 =========================== ",
    "               i                      $         >              e          ",
    "                                      j                                   ",
    "                                      =         $                         ",
    "                     >                          j                         ",
    "                               >            $   =                         ",
    "                                            j                             ",
    "                                     $      =                             ",
    "                                     j                                    ",
    "                                     =                                    ",
    "                                                                          ",
    "                                                                          ",
    "        %             $                                                   ",
    "              #               j                                           ",
    "==========================================================================",
    "==========================================================================",
    "==========================================================================",
    "==========================================================================",
    "==========================================================================",
  ],
  //For Loop Level
  [
    "=       >    =    >       @",
    "===========================",
    "=                          ",
    "=                         8",
    "=    >           >  =   >  ",
    "=          > =             ",
    "===========================",
    "=                          ",
    "=                          ",
    "=   =         >   =   >   8",
    "=       >                  ",
    "===========================",
  ],

  //Recursion Level 
  [
    "             $          $          ! r ",
    "                                 === ",
    "  $          j          j       $     ",
    "  ===  $     =          =  $  ===     ",
    "       ===        $      ===          ",
    "                = > =                 ",
    "                  =                   ",
    "                                      ",
    "                                      ",
    "                                      ",
    "    !              j                  ",
    "                  =                  !",
    "      >   j      >        j      >    r",
    "======================================",
  ],
]

// define what each symbol means in the level graph
const levelConf = {
  // grid size
  width: 64,
  height: 64,
  // define each object as a list of components
  //red pill
  "ª": () => [
    sprite("red-pill"),
    area(),
    solid(),
    origin("bot"),
    'ª'
  ],
  //blue pill
  "º": () => [
    sprite("blue-pill"),
    area(),
    solid(),
    origin("bot"),
    'º'
  ],
  //ground 
  "=": () => [
    sprite("road"),
    area(),
    solid(),
    origin("bot"),
  ],
  //coin
  "$": () => [
    sprite("coin"),
    area(),
    pos(0, -9),
    origin("bot"),
    "coin",
  ],
  //power up block
  "%": () => [
    sprite("block"),
    area(),
    solid(),
    origin("bot"),
    "block",
  ],
  //spikes block
  "^": () => [
    sprite("spike"),
    area(),
    solid(),
    origin("bot"),
    "danger",
  ],
  // Apple Sprite
  "#": () => [
    sprite("sun"),
    area(),
    origin("bot"),
    body(),
    "sun",
  ],
  //Bug Enemy Sprite
  ">": () => [
    sprite("bug"),
    area(),
    origin("bot"),
    body(),
    patrol(),
    "enemy",
  ],
  //Green Portal
  "@": () => [
    sprite("grn"),
    area({ scale: 0.5, }),
    origin("bot"),
    pos(0, -12),
    "grn",
  ],
  // bg sprite
  "b": () => [
    sprite("bg"),
    area({ scale: 100, }),
    origin("bot"),
    pos(0, -12),
    "bg",
  ],
  // i sprite
  "i": () => [
    sprite("if"),
    area({ scale: 0.5, }),
    origin("bot"),
    pos(0, -12),
    "if",
  ],
  //Else sprite
  "e": () => [
    sprite("else"),
    area({ scale: 0.5, }),
    origin("bot"),
    pos(0, -12),
    "else",
  ],
  //red portal
  "r": () => [
    sprite("red"),
    area({ scale: 0.5, }),
    origin("bot"),
    pos(0, -12),
    "red",
  ],

  //Jump Block
  // "j":
  "j": () => [
    sprite("note"),
    area(),
    origin("bot"),
    body(),
    solid(),
    "note",
  ],
  //Loop Portal
  // "8":
  "8": () => [
    sprite("loop-portal"),
    area(),
    origin("bot"),
    body(),
    solid(),
    "loop-portal",
  ],

  //Recursive Portal
  //!
  "!": () => [
    sprite("rec"),
    area({ scale: 0.5, }),
    origin("bot"),
    pos(0, -12),
    "rec",
  ]



}

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

  const title_music = play("cyber-music", {
    volume: 0.5,
    loop: true
  })

  add([
    sprite('gamebg'),
    layer('gamebg'),
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(3.0)
  ])

  gravity(3200)

  // add level to scene
  const level = addLevel(LEVELS[levelId ?? 0], levelConf)
  // Start Screen

  // define player object
  const player = add([
    sprite("player"),
    pos(50, 450),
    area(),
    scale(1),
    // makes it fall to gravity and jumpable
    body(),
    // the custom component we defined above
    big(),
    origin("bot"),
  ])

  // action() runs every frame
  player.onUpdate(() => {
    // center camera to player
    camPos(player.pos)
    // check fall death
    if (player.pos.y >= FALL_DEATH) {
      go("lose")
      title_music.stop()
    }
  })

  // if player onCollide with any obj with "danger" tag, lose
  player.onCollide("danger", () => {
    go("lose")
    play("hit")
    title_music.stop()
  })
  //define interaction between player and green portal
  player.onCollide("grn", () => {
    play("portal")
    go("rec-intro")
    title_music.stop()
    /*
    if (levelId + 1 < LEVELS.length) {
      go("game", {
        levelId: levelId + 1,
        coins: coins - coins
      })
    } else {
      go("win")
    }
  */

  })



  //Telaports the user to the layer above for the loop level
  player.onCollide("loop-portal", () => {
    play("portal")
    player.moveTo(150, player.pos.y - 300)
  })

  /*
  =======================================================================
  collitions
  =======================================================================
  */

  //red pill
  player.onCollide("ª", () => {
    play("portal")
    go("rec-intro")
    title_music.stop()
    /*
      if (levelId + 1 < LEVELS.length) {
        go("rec-intro", {
          levelId: levelId + 2,//jumps 2 levels ahead
          coins: coins - coins
        })
      } else {
        go("win")
      }*
    */
  })

  //blue pill
  player.onCollide("º", () => {
    play("portal")
    go("for-loop-intro")
    title_music.stop()
    /*
      if (levelId + 1 < LEVELS.length) {
        go("for-loop-intro", {
          levelId: levelId + 1,//jumps 1 level ahead
          coins: coins - coins
        })
      } else {
        go("win")
      }
    */
  })

  //Define the recursive portal and its interaction with the player
  player.onCollide("red", () => {
    play("portal")
    if (coins == 7 && levelId + 1 < LEVELS.length) {
      go("game", {
        levelId: levelId + 1,
        coins: coins - coins,
      })
      title_music.stop()
    } else if (coins < 7) {
      go("game", {
        levelId: levelId,
        coins: coins - coins,
      })
      title_music.stop()
    } else {
      go("win")
      title_music.stop()
    }
  })

  player.onGround((l) => {
    if (l.is("enemy")) {
      player.jump(JUMP_FORCE * 1.5)
      destroy(l)
      addKaboom(player.pos)
      play("powerup")
    }
  })
  //if player touches ememy, they loose
  player.onCollide("enemy", (e, col) => {
    // if it's not from the top, die
    //if (player.
    if (player.is("evo")) {
      player.use(sprite("player"))
    } else if (!col.isBottom()) {
      go("lose")
      play("hit")
      title_music.stop()
    }
  })

  //JumpNote Collision
  player.onCollide("note", (e, col) => { })

  //JumpNote to make the player jump
  player.onGround((l) => {
    if (l.is("note")) {
      player.jump(JUMP_FORCE * 1.5)
      addKaboom(player.pos)
      play("powerup")
    }
  })

  let hasApple = false

  // grow an apple if player's head bumps into an obj with "prize" tag
  player.onHeadbutt((obj) => {
    if (obj.is("block") && !hasApple) {
      const apple = level.spawn("#", obj.gridPos.sub(0, 1))
      apple.jump()
      hasApple = true
      play("blip")
    }
  })

  // player grows big onCollide with an "apple" obj
  player.onCollide("sun", (a) => {
    destroy(a)
    // as we defined in the big() component
    player.use(sprite("evo"))
    player.biggify(99999999)
    hasApple = false
    play("powerup")
  })

  let coinPitch = 0

  onUpdate(() => {
    if (coinPitch > 0) {
      coinPitch = Math.max(0, coinPitch - dt() * 100)
    }
  })
  //if player collides with coin, they get a coin
  player.onCollide("coin", (c) => {
    destroy(c)
    play("coin", {
      detune: coinPitch,
    })
    coinPitch += 100
    coins += 1
    coinsLabel.text = "Beans: " + coins
  })

  const coinsLabel = add([
    text("Beans: " + coins),
    pos(24, 24),
    fixed(),
  ])

  // jump with space
  onKeyPress("space", () => {
    // these 2 functions are provided by body() component
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE)
      play("blip")
    }
  })
  onKeyPress("up", () => {
    // these 2 functions are provided by body() component
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE)
      play("blip")
    }
  })

  //left key
  /*
  onKeyDown("left", () => {
    player.use(sprite("player-right-walk"))
    player.use(sprite("player"))
    player.use(sprite("player-right-walk"))
    player.use(sprite("player"))
    player.use(sprite("player-right-walk"))
    player.move(-MOVE_SPEED, 0)
  })
 */
  onKeyDown("left", () => {
    player.flipX(true);
    if (toScreen(player.pos).x > 20) {
      player.move(-MOVE_SPEED, 0);
    }
  });

  //right key
  onKeyDown("right", () => {
    player.flipX(false);
    player.move(MOVE_SPEED, 0)
  })
  //down key
  onKeyPress("down", () => {
    player.weight = 3
  })
  //release down
  onKeyRelease("down", () => {
    player.weight = 1
  })
  // f for full screen key
  onKeyPress("f", () => {
    fullscreen(!fullscreen())
  })

})

scene("lose", () => {
  const lose_song = play("lose", {
    volume: 0.5,
    loop: false
  })
  add([
    sprite('losescrn'),
    layer('losescrn'),
    origin("center"),
    scale(6),
    pos(width() / 2, height() / 2),
  ])
  add([
    text("You Lose"),
    pos(width() / 2, height() / 2),
    origin("center"),
    play("death")
  ])
  onKeyPress(() => go("start"))
})

scene("win", () => {
  win_music = play("win", {
    volume: 0.5,
    loop: true
  })

  add([
    sprite('winscrn'),
    layer('winscrn'),
    origin("center"),
    scale(6),
    pos(width() / 2, height() / 2),
  ])

  add([
    text("You Win"),
    pos(width() / 2, height() / 2),
    pos(width() / 2, height() / 2),
    origin("center"),
  ])

  onKeyPress(() =>
    go("game"))
  win_music.stop()
})

scene("start", () => {

  const title_music = play("intro", {
    volume: 0.5,
    loop: true
  })


  add([
    sprite('bg'),
    layer('bg'),
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(1),
    fixed(),
    text("Sprite Battle XD"),
    text("Press Any Key to Start")
  ])
  onKeyPress(() => {
    go("intro")
    title_music.stop()
    play("signal")
  })
})

scene("intro", () => {
  intro = play("intro", {
    volume: 0.5,
    loop: true
  })
  add([
    sprite('bg'),
    layer('bg'),
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(1),
    fixed(),
  ])

  add([
    pos(width() / 2, height() / 2),
    origin("center"),
    text("Computer Science can be a very difficult topic to understand. We built this game to help visualize some concepts.   Press Any Key to continue",
      {
        size: 40,
        width: 500,
        font: "sinko"
      })

  ])

  onKeyPress(() => {
    go("if-else")
    play("signal")
    intro.stop()
  })
})

scene("for-loop-intro", () => {
  intro = play("intro", {
    volume: 0.5,
    loop: true
  })
  add([
    sprite('bg'),
    layer('bg'),
    origin("center"),
    pos(width() / 2, height() / 2),
    text("For Loop")
  ])

  onKeyPress(() => {
    go("game", {
      levelId: 1,//jumps 1 level ahead
      coins: 0
    })
    play("signal")
    intro.stop()
  })

})

scene("if-else", () => {
  intro = play("intro", {
    volume: 0.5,
    loop: true
  })
  add([
    sprite('bg'),
    layer('bg'),
    pos(width() / 2, height() / 2),
    origin("center"),
    scale(1),
    fixed()
  ])
  add([
    pos(width() / 2, height() / 2),
    origin("center"),
    text("If-Else",
      {
        size: 40,
        width: 500,
        font: "sinko"
      })
  ])
  onKeyPress(() => {
    go("game", {
      levelId: 0,//jumps 1 level ahead
      coins: 0
    })
    play("signal")
    intro.stop()
  })
})

scene("rec-intro", () => {
  intro = play("intro", {
    volume: 0.5,
    loop: true
  })
  add([
    sprite('bg'),
    layer('bg'),
    origin("center"),
    pos(width() / 2, height() / 2),
    text("Recursion")
  ])


  onKeyPress(() => {
    go("game", {
      levelId: 2,//jumps 1 level ahead
      coins: 0
    })
    play("signal")
    intro.stop()
  })
})


go("start")
