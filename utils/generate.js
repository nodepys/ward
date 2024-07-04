module.exports = (length = 8) => {
  let charset = "abcdefghijklmnopqrstuvwxyz0123456789",
    retVal = "";

  // Generate the first character as a letter
  retVal += "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26));

  // Generate the rest of the characters
  for (let i = 1, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }

  return retVal;
}