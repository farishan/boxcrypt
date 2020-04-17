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
    if(game.currentRoom.items.length > 0){
      // Loop through items
      for (let index = 0; index < game.currentRoom.items.length; index++) {
        const item = game.currentRoom.items[index];
        // console.log(item)

        // Check if a box
        if(item.decryptable){
          el('actions').innerHTML += `<button class="bg-blue-300 controller-item" data-id="${item.id}">open ${item.name}</button>`
        }
      }
    }
  }
}

Renderer.prototype.renderBox = function(box){
  console.log(box)
  const ui = el('boxprompt')
  ui.className += 'border p-2 text-center'
  ui.innerHTML += box.name+'<br>'
  ui.innerHTML += box.password+'<br>'
  let input = document.createElement('input')
  input.focus()
  ui.appendChild(input)
  // ui.innerHTML += '<input autofocus class="border" type="text"/><br>'
  ui.innerHTML += '<br>todo: press enter to submit<br>'
}

Renderer.prototype.render = function(){
  const UI = this.UI
  this.renderPlayer(UI.player)
  this.renderCurrentRoom(UI.currentRoom)
  this.renderExits(UI.exits)
  this.renderActions(UI.actions)
  this.renderMap(UI.map)
}