/*
game needs:
player
rooms
map
*/
class Game {
  constructor(config){
    const {
      player,
      map,
      controller,
      renderer
    } = config

    this.player = player
    this.map = map
    this.renderer = renderer
    this.controller = controller

    this.currentRoom = {}
    this.currentExits = {}
  }

  init() {
    this.map.generateRooms(normalizedRoomTypes)
  }

  update() {
    this.currentRoom = this.getCurrentRoom()
    this.currentExits = this.getCurrentExits()
  }

  getCurrentRoom() {
    return this.map.rooms[this.player.position]
  }

  getCurrentExits() {
    const { width, data } = this.map
    const { position } = this.player
    let result = {}

    const north_edge = position - width < 0
    const north = position - width
    const east_edge = (position + 1) % width === 0
    const east = east_edge ? -1 : position + 1
    const south_edge = position + width > data.length
    const south = south_edge ? -1 : position + width
    const west_edge = position % width === 0
    const west = west_edge ? -1 : position - 1
    const northeast = north_edge ? -1 : east_edge ? -1 : position - width + 1
    const northwest = north_edge ? -1 : west_edge ? -1 : position - width - 1
    const southeast = south_edge ? -1 : east_edge ? -1 : position + width + 1
    const southwest = south_edge ? -1 : west_edge ? -1 : position + width - 1

    const direction = {
      n: north,
      ne: northeast,
      e: east,
      se: southeast,
      s: south,
      sw: southwest,
      w: west,
      nw: northwest
    }

    for (let k in direction) {
      if(data[direction[k]]){
        result[k] = direction[k]
      }else{
        result[k] = undefined
      }
    }

    return result
  }

  putItem(item, position) {
    let room = this.map.rooms[position]

    if(room){
      room.items.push(item)
    }
  }

  generateBox(lastIndex) {
    console.log('lastindex:', lastIndex)
    let index = -1
    let room = 0

    // Dont generate on empty map tile and last room,
    // must be generated on valid and new
    while(room === 0 || index === lastIndex){
      let random = Math.floor(Math.random()*this.map.rooms.length)
      index = random
      room = this.map.rooms[index]
    }

    // Manually create item an put it in a room
    let cbox1 = new Cbox()
    cbox1.id = 1
    // console.log(cbox1)
    game.putItem(cbox1, index)
    // console.log(game)
  }
}
