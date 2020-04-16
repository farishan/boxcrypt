// Room Type Database
const _roomTypes = [
  new RoomType(1, 'road'),
  new RoomType(2, 'house')
]

// Normalized Room Type Database
const _roomTypesNormalized = normalize(_roomTypes);
const normalizedRoomTypes = _roomTypesNormalized;
