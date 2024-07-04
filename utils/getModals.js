const path = require("path")
const getAllFiles = require("./getFiles")
module.exports = (dirname, exceptions = []) => {
  let modals = []

  const modalCategories = getAllFiles(
    path.join(dirname, '..', "..", "modals"), true
  )
  for (const modalCategory of modalCategories) {
    const modalFiles = getAllFiles(modalCategory)

    for (const modalFile of modalFiles) {
      const modal = require(modalFile)

      if (exceptions.includes(modal.name)) {
        contine
      }

      modals.push(modal)
    }
  }
  return modals
}