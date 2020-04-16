function el(id){
  return document.getElementById(id)
}

function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/*
 * Normalize function
 *
 * Note: of course this function can be replaced with
 * other database normalizer js package from npm
 */
function normalize(aoo){
  let cloned = [...aoo]
  let result = {}
  for (let index = 0; index < cloned.length; index++) {
    const x = cloned[index];
    result[x.id] = x
  }
  return result
}