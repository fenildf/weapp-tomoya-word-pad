const bingAPI = 'http://xtk.azurewebsites.net/BingDictService.aspx'
const bingLogoURL = 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_1489711227/bing-translator.png'

const TRANS_ERROR = `Ooooops... Something's wrong with online translation...`

import { getSam } from "./settingsManager";

function bingTransToHTML(json) {
  var resHTML = `<div>`
  resHTML += `<h4>${json.word}</h4>`
  if (json.pronunciation && json.pronunciation.AmE && json.pronunciation.BrE) {
    resHTML += `<h5 class='rich-subtitle'>Pronunciation</h5>`
    resHTML += `<div class='rich-content'>`
      resHTML += `<strong>AmE: </strong>`
      resHTML += `<span> /${json.pronunciation.AmE}/</span>`
      resHTML += `<strong>     BrE: </strong>`
      resHTML += `<span> /${json.pronunciation.BrE}/</span>`
    resHTML += `</div>`
  }
  if (json.defs) {
    resHTML += `<h5 class='rich-subtitle'>Definitions</h5>`
    json.defs.forEach((def) => {
      resHTML += `<div class='rich-content'>`
      resHTML += `${def.pos}   ${def.def}`
      resHTML += `</div>`
    })
  }
  if (json.sams) {
    resHTML += `<h5 class='rich-subtitle'>Samples</h5>`
    json.sams.forEach((sam) => {
      resHTML += `<div class='rich-content'>`
      resHTML += `<p style='font-weight: 600'>· ${sam.chn}</p>`
      resHTML += `<p>· ${sam.eng}</p>`
      resHTML += `<br/>`
      resHTML += `</div>`
    })
  }
  resHTML += `<div class='rich-footer'>`
    resHTML += `<span>PROVIDED BY </span><img src="${bingLogoURL}" height='20px'></img> <span>BING TRANSLATOR</span>`
  resHTML += `</div>`
  resHTML += '</div>'

  return resHTML
}

function errorToHTML() {
  var resHTML = ''
  resHTML += `<div>`
  resHTML += `<div class='rich-error'>${TRANS_ERROR}</div>`
  resHTML += `</div>`
  return resHTML
}

function bingTrans(word) {
  return new Promise((resolve, reject) => {
    const [needSam = false, error] = getSam()
    if (error) {
      return resolve([null, error])
    }

    const url = bingAPI
    wx.request({
      url,
      data: {
        Word: word,
        Samples: needSam
      },
      success: function(res) {
        const html = bingTransToHTML(res.data)
        resolve([html, null])
      },
      fail: function(res) {
        console.error(res)
        const errorHTML = errorToHTML()
        resolve([errorHTML, res])
      }
    })

  })
}

module.exports = {
  bingTrans
}