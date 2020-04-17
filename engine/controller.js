/*
 * @dependencies game, renderer
 *
 * Controller bertugas merubah data game lalu di render.
 */
class Controller {
  constructor(game, renderer){
    this.game = game
    this.renderer = renderer
  }

  init(){
    this.activateExits()
  }

  activateExits() {
    let controllerExits = document.getElementsByClassName('controller-exit')

    if(controllerExits.length > 0){
      for (let index = 0; index < controllerExits.length; index++) {
        const element = controllerExits[index];

        element.addEventListener('click', (e) => {
          const position = e.target.dataset.target
          this.game.player.move(parseInt(position))
          this.game.update()
          this.renderer.render()
          this.activateExits()
          this.activateItems()
        })
      }
    }
  }

  activateItems() {
    let controllerItems = document.getElementsByClassName('controller-item')
    console.log(controllerItems.length)
    if(controllerItems.length > 0){
      for (let index = 0; index < controllerItems.length; index++) {
        const element = controllerItems[index];
        console.log(element)

        element.addEventListener('click', (e) => {
          const id = e.target.dataset.id
          const item = this.game.currentRoom.items.filter(x => x.id == id)[0]

          if(item.decryptable){
            this.renderer.renderBox(item)
          }
        })
      }
    }
  }
}
