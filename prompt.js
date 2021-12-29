const pr = require('prompt');

function getFromPrompt(names) {
  const schema = {
    properties: {}
  }
  for(let i = 0; i < names.length; i++) {
    schema.properties[names[i]] = {
      required: true
    }
  }
  return new Promise((resolve, reject) => {
    pr.start();
    pr.get(schema, (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

module.exports = {
  getFromPrompt
}