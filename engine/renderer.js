/*
 * Renderer bertugas menampilkan data game ke UI.
 * PURE CLASS, NO DEPENDECIES
 * semua lewat param
 */

class Renderer {
  constructor(){}
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
Renderer.prototype.renderMap = function(map, player, ui){
  this.resetUI(ui)

  const { position } = player
  const { width, data } = map

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

Renderer.prototype.renderExits = function(game, ui){
  this.resetUI(ui)

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

Renderer.prototype.renderPlayer = function(player, ui){
  this.resetUI(ui)
  ui.innerHTML = JSON.stringify(player)
}

Renderer.prototype.renderRoom = function(room, ui){
  this.resetUI(ui)
  ui.innerHTML = JSON.stringify(room)
}

Renderer.prototype.renderActions = function(game, ui){
  this.resetUI(ui)

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

Renderer.prototype.renderBox = function(box, ui, cb){
  // Render box after user click open
  // console.log(box)

  // Init the boxprompt element
  ui.className += 'border p-2 text-center'
  ui.innerHTML += box.name+'<br>'
  ui.innerHTML += box.password+'<br>'

  // Create password input
  let input = document.createElement('input')
  let inputId = 'input_'+box.id
  input.setAttribute('id', inputId)
  input.className += 'border'
  ui.appendChild(input)

  cb(inputId)
}

Renderer.prototype.render = function(game){
  if(game){
    this.renderPlayer(game.player, UI.player)
    this.renderRoom(game.currentRoom, UI.currentRoom)
    this.renderExits(game, UI.exits)
    this.renderActions(game, UI.actions)
    this.renderMap(game.map, game.player, UI.map)
  }
}