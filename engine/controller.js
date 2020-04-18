/*
 * Controller bertugas merubah data game lalu di render.
 */
class Controller {
  constructor(){}

  init(game){
    this.activateExits(game)
  }

  activateExits(game) {
    let controllerExits = document.getElementsByClassName('controller-exit')

    if(controllerExits.length > 0){
      for (let index = 0; index < controllerExits.length; index++) {
        const element = controllerExits[index];

        element.addEventListener('click', (e) => {
          const position = e.target.dataset.target
          game.player.move(parseInt(position))
          game.update()
          game.renderer.render(game)
          this.activateExits(game)
          this.activateItems(game)
        })
      }
    }
  }

  activateItems(game) {
    let controllerItems = document.getElementsByClassName('controller-item')

    if(controllerItems.length > 0){
      for (let index = 0; index < controllerItems.length; index++) {
        const element = controllerItems[index];

        this.activateItem(element, game)
      }
    }
  }

  activateItem(element, game) {
    let _this = this
    element.addEventListener('click', (e) => {
      const id = e.target.dataset.id
      const item = game.currentRoom.items.filter(x => x.id == id)[0]

      if(item.decryptable){
        game.renderer.renderBox(item, UI.boxprompt, function(id){
          _this.activateInput(id, item, game)
        })
      }
    })
  }

  activateInput(id, item, game) {
    const _this = this
    // Activate input
    setTimeout(function(){
      const i = document.getElementById(id)
      i.focus()
      i.onkeydown = function(e){
        if(e.keyCode == 13){
          // check inputed password
          if(i.value == item.password){
            item.open()
            game.player.score++
            item.destroy(game)
            game.renderer.resetUI(UI.boxprompt)
            game.renderer.render(game)
            _this.activateExits(game)
            _this.activateItems(game)
            game.generateBox(game.currentRoom.getIndex(game))
          }
        }
      }
    }, 500)
  }
}
