class Item {
  constructor(){
    this.id = null
    this.name = 'default_item'
    this.description = '-'
  }
}

class Cbox extends Item {
  constructor(){
    super()
    this.decryptable = true
    this.password = 'default'
    this.items = []
  }
}

