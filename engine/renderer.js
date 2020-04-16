// question: harusnya renderer masukin ke game atau game masukin ke renderer?
// answer: sementara game yang dimasukin ke renderer

/*
 * @dependencies game, UI
 *
 * Renderer bertugas menampilkan data game ke UI.
 */

class Renderer {
  constructor(game, UI){
    this.game = game
    this.UI = UI
  }
  /*
   * Map Renderer
   *
   * player: this function need player.position
   * map: {width, length}
   * ui: DOM element
   */
  stylize = function (tile){
    tile.className += 'border border-gray-700'
  }

  resetUI = function (ui){
    ui.innerHTML = ''
  }
}

/*
 * @param ui: Map UI DOM Element
 */
Renderer.prototype.renderMap = function(ui){
  this.resetUI(ui)

  const { position } = this.game.player
  const { width, data } = this.game.map

  let counter = 0;
  for (let index = 0; index < data.length; index++) {
    const roomId = data[index];
    const tile = document.createElement('span')

    this.stylize(tile)

    if(index == position) {
      tile.style.color = 'red'
    }

    if(counter === width-1){
      tile.innerHTML += `<div class="inline-block w-4 h-4 text-center">${roomId}</div><br>`
      counter = 0
    }else{
      tile.innerHTML = `<div class="inline-block w-4 h-4 text-center">${roomId}</div>`
      counter++;
    }

    ui.appendChild(tile)
  }
}

Renderer.prototype.renderExits = function(ui){
  this.resetUI(ui)
  const game = this.game

  for (var k in game.currentExits) {
    const element = game.currentExits[k];
    const html = `<a href="#" class="controller-exit" data-target="${element}">${k}</a> `
    if(element){
      ui.innerHTML += html
    }else{
      if(element >= 0){
        if(k === 'nw' || k === 'n' || k === 'w'){
          ui.innerHTML += html
        }
      }
    }
  }
}

Renderer.prototype.renderPlayer = function(ui){
  this.resetUI(ui)

  ui.innerHTML = JSON.stringify(player)
}

Renderer.prototype.renderCurrentRoom = function(ui){
  this.resetUI(ui)
  ui.innerHTML = JSON.stringify(this.game.currentRoom)
}

Renderer.prototype.renderActions = function(ui){
  this.resetUI(ui)
  const game = this.game

  if(game.currentRoom){
    for (let index = 0; index < game.currentRoom.items.length; index++) {
      const item = game.currentRoom.items[index];
      el('actions').innerHTML += `<button onclick="openItem(${item.id})">open ${item.name}</button>`
    }
  }
}

Renderer.prototype.render = function(){
  const UI = this.UI
  this.renderPlayer(UI.player)
  this.renderCurrentRoom(UI.currentRoom)
  this.renderExits(UI.exits)
  this.renderActions(UI.actions)
  this.renderMap(UI.map)
}