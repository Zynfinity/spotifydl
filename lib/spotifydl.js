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
async function ugu(buffer){
    return new Promise((resolve, reject) => {
        fromBuffer(buffer).then((cek_file) => {
			nama = Date.now()
			if(cek_file == undefined) return resolve({status: false})
            fs.writeFileSync(`./tmp/${nama}.${cek_file.ext}`, buffer);
            const bodyForm = new FormData();
            bodyForm.append(
                "files[]",
                fs.createReadStream(`./tmp/${nama}.${cek_file.ext}`)
            );
			//
            axios(`https://uguu.se/upload.php`, {
                method: "POST",
                data: bodyForm,
                headers: Object.assign({ "accept": "*/*", "accept-language": "en-US,en;q=0.9,id;q=0.8" }, bodyForm.getHeaders ? bodyForm.getHeaders() : { 'Content-Type': 'multipart/form-data' };)
            }).then(respon => {
                const result = {
                    status: respon.data.success ? 200 : 404,
                    result: {
                        nama: respon.data.files[0].name,
                        url: respon.data.files[0].url,
                        size: respon.data.files[0].size,
                        hash: respon.data.files[0].hash
                    }
                };
				fs.unlinkSync(`./tmp/${nama}.${cek_file.ext}`)
                resolve(result);
            });
        });
    });
};
const dl = async(url) => {
  if(!/open|spotify|track/.test(url)) return({
    status: false,
    message: "Link not valid!"
  })
  const getdata = await spotify.getTrack(url)
  const down = await spotify.downloadTrack(url)
  const upload = await ugu(down)
  return({
      status: true,
      ...getdata,
      ...{size: upload.result.size, url: upload.result.url}
  })
}
module.exports = dl
