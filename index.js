function _start(){
  game.init()
  game.update()

  game.generateBox(-1)

  // !IMPORTANT: controller must be init after render
  renderer.render(game);
  controller.init(game)
}

/* CONFIG
-------------------- */
var renderer = new Renderer()
var controller = new Controller()
var player = new Character(4) // @param position: choose from map
var map = _maps[0] // Get map from database
var game = new Game({ player, map, controller, renderer})

/* START HERE
-------------------- */
window.onload = _start

/* FUNCTIONS
-------------------- */
function openItem(item){
  console.log(item)
}
