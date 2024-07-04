const path = require("path")
const getAllFiles = require("./getFiles")
module.exports = (dir, exceptions = []) => {
  let buttons = []

  const buttonCategories = getAllFiles(
    path.join(dir, '..', '..', "Buttons"), true
  )
  for (const buttonCategory of buttonCategories) {
    const bottonFiles = getAllFiles(buttonCategory)
    for (const buttonFile of bottonFiles) {
      try {
        const button = require(buttonFile)

        if (exceptions.includes(button.name)) {
          contine
        }

        buttons.push(button)
      } catch (e) {
        console.log(e)
      }
    }
  }

  return buttons
}