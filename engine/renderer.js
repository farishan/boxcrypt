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

    // dev only
    // show room with box in map
    // console.log(map.rooms[index].items)
    // if(map.rooms[index].items && map.rooms[index].items.length > 0){
    //   tile.style.color = 'green'
    // }

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

  const buttonMap = [
    'nw', 'n', 'ne',
    'w', null, 'e',
    'sw', 's', 'se'
  ]
  const size = _config.tileSize;

  for (let index = 0; index < buttonMap.length; index++) {
    let classes = "block border text-center "
    let button = document.createElement('a')
    button.setAttribute('href', '#')
    button.style = `width: ${size}px; height: ${size}px`
    let valid = false

    const direction = buttonMap[index];
    button.innerHTML = direction

    if(direction !== null){
      const position = game.currentExits[direction];

      if(position > -1){
        if(position > 0){
          valid = true
        }else{
          if(
            direction === 'nw' ||
            direction === 'n' ||
            direction === 'w'){
            valid = true
          }
        }

        button.dataset.target = position
      }

      classes += valid ? ' controller-exit' : ' opacity-25'
      button.className = classes
    }

    ui.appendChild(button)

    // New line
    if((index+1)%3 === 0) ui.innerHTML += '<div class="w-full"></div>'
  }
}

Renderer.prototype.renderPlayer = function(player, ui){
  this.resetUI(ui)
  // ui.innerHTML = JSON.stringify(player)
  ui.innerHTML = ' '+player.score
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
          el('actions').innerHTML += `<button class="bg-blue-300 controller-item px-2" data-id="${item.id}">open ${item.name}</button>`
        }
      }
    }
  }
}

Renderer.prototype.renderBox = function(box, ui, cb){
  // Render box after user click open
  // console.log(box)

  // Init the boxprompt element
  ui.className += 'border p-2 text-center text-sm bg-yellow-300'
  ui.innerHTML += '<b>'+box.name+'</b><br>'
  ui.innerHTML += 'type this: <pre style="margin-bottom: 0">' + box.password+'</pre>and press enter key<br>'

  // Create password input
  let input = document.createElement('input')
  let inputId = 'input_'+box.id
  input.setAttribute('id', inputId)
  input.className += 'border my-2 p-2 text-center'
  ui.appendChild(input)

  cb(inputId)
}

Renderer.prototype.render = function(game){
  if(game){
    this.resetUI(UI.boxprompt)
    this.renderPlayer(game.player, UI.player)
    this.renderRoom(game.currentRoom, UI.currentRoom)
    this.renderExits(game, UI.exits)
    this.renderActions(game, UI.actions)
    this.renderMap(game.map, game.player, UI.map)

    let html = game.currentRoom.name + ' | ' + game.currentRoom.type.name + ' | '
    html += game.currentRoom.description
    this.log(html)

    // dynamic map width
    UI.map.style = `width: ${_config.tileSize*game.map.width}px;`
  }
}

Renderer.prototype.log = function(text){
  const div = document.createElement('div')
  div.className = 'p-2 border mb-2'
  div.innerHTML = text
  UI.log.appendChild(div)
  UI.log.scrollTop = UI.log.scrollHeight
}