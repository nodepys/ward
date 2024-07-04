const randomColor = require("./randomColor")
module.exports = (title, description, fields, color, author) => {
  return {
    type: "rich",
    title: title,
    description: description,
    fields: fields,
    timestamp: new Date(),
    color: color || randomColor(),
    author: author
  }
}
