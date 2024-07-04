
String.prototype.toHex = function () {
  for (var i = 1, j = this.length, $ = this.charCodeAt(0).toString(16); i < j; i++) $ += ' ' + this.charCodeAt(i).toString(16);
  return $;
};
module.exports = () => {
  return Math.floor(Math.random() * 16777216)
}