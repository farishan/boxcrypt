/*
 * GameMap Class
 * @dependencies [RoomType] database
 *
 * width: map's x axis width
 * data: array of [RoomType] ids
 */
class GameMap {
  constructor(config){
    const {
      id,
      name = 'default-map-name',
      description = '-',
      width,
      data
    } = config

    this.id = id
    this.name = name
    this.description = description
    this.width = width
    this.data = data
    this.dataRendered = []
    this.rooms = []
  }
}

/*
* @param Normalized Room Types
*/
GameMap.prototype.populateRoomType = function(normalizedRoomTypes){
  this.dataRendered = []
  for (let index = 0; index < this.data.length; index++) {
    const roomTypeId = this.data[index];

    let room = 0
    if(roomTypeId > 0){
      room = normalizedRoomTypes[roomTypeId]
    }

    this.dataRendered.push(room)
  }
}

/*
* @param Normalized Room Types
*/
GameMap.prototype.generateRooms = function(normalizedRoomTypes){
  this.rooms = []
  for (let index = 0; index < this.data.length; index++) {
    const roomTypeId = this.data[index];

    let room = 0
    if(roomTypeId > 0){
      room = new Room({
        id: ID(),
        name: 'room '+index,
        typeId: roomTypeId
      })
      room.populate(normalizedRoomTypes)
    }

    this.rooms.push(room)
  }
}

/* USAGE
-----------------------------------*/
// goto /databases/maps.js
