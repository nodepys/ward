module.exports = (possibility, secEmail) => {
 if (
  (possibility.slice(0, 2) == secEmail.slice(0, 2)) &
  (possibility.split("@")[1] == secEmail.split("@")[1])
 ) {
  return true;
 }
 if (
  ((possibility.split("*")[0].length == 1 ||
   possibility.split("@").length == 1) &&
   secEmail.split("*")[0].length == 1) ||
  secEmail.split("@")[0].length == 1
 ) {
  if (
   (possibility.slice(0, 1) == secEmail.slice(0, 1)) &
   (possibility.split("@")[1] == secEmail.split("@")[1])
  ) {
   return true;
  }
 }
 return false;
}