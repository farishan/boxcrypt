/*
 * position: the character initial position,
 * must be one of valid index on map
 */
class Character {
  constructor(position){
    this.position = position
  }

  move(newPosition) {
    this.position = newPosition
  }
}
