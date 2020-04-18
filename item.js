class Item {
  constructor(){
    this.id = null
    this.name = 'default_item'
    this.description = '-'
    this.value = 0
  }
}

class Cbox extends Item {
  constructor(){
    super()
    this.decryptable = true
    this.password = 'default'
    this.items = ['coin']
  }

  open(){
    console.log(this.items)
  }

  destroy(game){
    let thisIndex = -1
    for (let index = 0; index < game.currentRoom.items.length; index++) {
      const item = game.currentRoom.items[index];

      if(item.id == this.id){
        console.log('destroy!')
        thisIndex = index
      }
    }

    if(thisIndex > -1){
      game.currentRoom.items.splice(thisIndex, 1)
    }
  }
}

