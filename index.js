/* CONFIG
-------------------- */
var player = new Character(4) // @param position: choose from map
var map = _maps[1] // Get map from database
var game = new Game({ player, map })
var renderer = new Renderer(game, UI)
var controller = new Controller(game, renderer)

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

  renderer.render();

  // !IMPORTANT: controller must be init after render
  controller.init()
}

/* FUNCTIONS
-------------------- */
function openItem(item){
  console.log(item)
}
