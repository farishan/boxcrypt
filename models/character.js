/*
 * position: the character initial position,
 * must be one of valid index on map
 */
class Character {
  constructor(position){
    this.position = position
    this.score = 0
  }

  move(newPosition) {
    this.position = newPosition
  }
}
