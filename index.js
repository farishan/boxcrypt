/* CONFIG
-------------------- */
var renderer = new Renderer()
var controller = new Controller()
var player = new Character(4) // @param position: choose from map
var map = _maps[0] // Get map from database
var game = new Game({ player, map, controller, renderer})

/* START HERE
-------------------- */
window.onload = function(){
  game.init()
  game.update()

  // Manually create item an put it in a room
  let cbox1 = new Cbox()
  cbox1.id = 1
  // console.log(cbox1)
  game.putItem(cbox1, 7)
  // console.log(game)

  renderer.render(game);

  // !IMPORTANT: controller must be init after render
  controller.init(game)
}

/* FUNCTIONS
-------------------- */
function openItem(item){
  console.log(item)
}
