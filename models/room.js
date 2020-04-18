/*
 * Room Class
 * @dependencies [RoomType]
 * fields:
 * id INT
 * name STRING
 * description STRING
 */
class Room {
  constructor(config){
    const {
      id,
      name,
      description = '-',
      typeId
    } = config
    this.id = id
    this.name = name
    this.description = description
    this.items = []
    this.typeId = typeId
    this.type = {}
  }

  /*
   * @param data: normalized Room Types
   */
  populate(data) {
    this.type = data[this.typeId]
  }

  getIndex(game){
    let _index = -1
    for (let index = 0; index < game.map.rooms.length; index++) {
      const room = game.map.rooms[index];
      if(room.id == this.id){
        _index = index
      }
    }
    return _index
  }
}

/* USAGE
-----------------------------------*/
// go to /databases/rooms.js