const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '9d3d540e7f9f49feb64c69b72d0831dd',
        clientSecret: '3f9f19e65f66418abceebc4299c3c6e7',
        refreshToken,
    })

    spotifyApi.refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn,
        })
    })
      .catch(() => {
        res.sendStatus(400)
    })

    
})

app.post('/login', (req, res) => {

    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '9d3d540e7f9f49feb64c69b72d0831dd',
        clientSecret: '3f9f19e65f66418abceebc4299c3c6e7'
    })

    spotifyApi.authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch(() => {
        res.sendStatus(400)
    })
})

app.listen(3001)