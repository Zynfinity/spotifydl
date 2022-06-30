const express = require('express')
const fs = require("fs")
const os = require('os')
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 8080;
const util = require('util');
const spoti = require('./spotifysearch')
const spotidl = require('./spotifydl')
module.exports = () => {
    try {
        app.set("json spaces",2)
        app.use(express.static('public'))
        app.get('/', async(req, res) => {
            return res.json({
                search: {
                    url: '/search?query=alone'
                },
                download: {
                    url: '/download?url=urltrack'
                }
            })
        })
        app.get("/search", async(req, res) => {
          const query = req.query.query
          if(!query) return res.json({
            status: false,
            message: 'Missing parameter query'
          })
          const se = await spoti(query)
          res.json(se)
        })
        app.get("/download", async(req, res) => {
            const query = req.query.url
            if(!query) return res.json({
              status: false,
              message: 'Missing url query'
            })
            try{
                const se = await spotidl(query)
                res.json(se)
            }catch(e){
                console.log(e)
                res.json({
                    status: false,
                    message: 'Unknown error!'
                })
            }
        })
        server.listen(PORT, () => {
            console.log(`Server Running on Port ${PORT}`)
        });
    } catch {}
}
