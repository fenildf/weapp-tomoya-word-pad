const octokit = require('@octokit/rest')()

function createGist() {
  return new Promise((resolve, reject) => {
    octokit.gists.create({
      description: 'A wordpad storage',
      public: false,
      files: {
        "words.json": {
          content: "{}"
        }
      }
    }).then(result => {
      return resolve([result, null])
    }).catch(error => {
      return reject([null, error])
    })
  })
}