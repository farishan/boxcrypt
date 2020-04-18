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
}

