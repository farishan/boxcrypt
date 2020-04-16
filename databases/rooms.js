/* Room Database
    harusnya sih room database itu dinamis,
    tergantung mapnya gimana
-------------------------------------- */
const _rooms = [
  new Room({
    id: 1,
    name: 'road 1',
    typeId: 1
  })
]

/* Normalized Room Database
-------------------------------------- */
var _roomsNormalized = normalize(_rooms);
var rooms = _roomsNormalized;

/* Room Database Operations
-------------------------------------- */
function populateRooms(rooms, roomTypes){
  let cloned = [...rooms]
  for (let index = 0; index < cloned.length; index++) {
    cloned[index].populate(roomTypes)
  }
  return cloned
}

// console.log(populateRooms(_rooms, _roomTypesNormalized))