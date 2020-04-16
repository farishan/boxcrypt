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
}

/* USAGE
-----------------------------------*/
// go to /databases/rooms.js