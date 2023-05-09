const path = process.cwd()
const fs = require('fs')
const { fromBuffer } = require("file-type");
const spotifydlCore = require("spotifydl-core").default
const axios = require('axios')
const credential = {
    clientId: '271f6e790fb943cdb34679a4adcc34cc',
    clientSecret: 'c009525564304209b7d8b705c28fd294'
}
const spotify = new spotifydlCore(credential)
const dl = async(url) => {
  if(!/open|spotify|track/.test(url)) return({
    status: false,
    message: "Link not valid!"
  })
  const down = await spotify.downloadTrack(url)
  const bes = await down.toString('base64')
  return({
      status: true,
	base64: bes
  })
}
module.exports = dl
