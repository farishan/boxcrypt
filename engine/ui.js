const UI = {
  map: el('map'),
  exits: el('exits'),
  player: el('player'),
  currentRoom: el('currentRoom'),
  actions: el('actions'),
  boxprompt: el('boxprompt'),
  log: el('log'),
}

// Base Styling
UI.map.className += "border p-2 inline-block"
UI.exits.className += "flex flex-wrap space-between"