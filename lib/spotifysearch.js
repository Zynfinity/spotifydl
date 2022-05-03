const Spotify = require('spotify-finder')
const client = new Spotify({
    consumer: {
        key: '271f6e790fb943cdb34679a4adcc34cc', // from v2.1.0 is required
        secret: 'c009525564304209b7d8b705c28fd294' // from v2.1.0 is required
    }
})
const spotifysearch = async (query) => {
    data = await client.search({
        q: query,
        type: 'track',
        limit: 10
    })
    peta = data.tracks.items
    artis = []
    const result = []
    if(peta == undefined) return({status: false, message: 'Song not found!'})
    /*peta.artists.map(s => {
        artis.push({
            name: s.name,
            url: s.external_urls.spotify
        })
    })*/
    for(let i of peta){
        result.push({
            judul: i.name,
            artist: i.artists,
            release_date: i.album.release_date,
            popularity: i.popularity,
            track: i.external_urls.spotify,
            thumbnail: i.album.images[0].url
        })
    }
    return(result != '' ? {
        status: true,
        result:result
    } : {status: false, message: 'Song Not Found'})
}
module.exports = spotifysearch
