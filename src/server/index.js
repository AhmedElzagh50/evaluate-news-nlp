const dotenv = require('dotenv')
dotenv.config()
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const fetch = require('node-fetch')

const app = express()

app.use(cors());
app.use(express.static('dist'))
app.use(express.json())

console.log(__dirname)

let textapi = ({
    url: 'https://api.meaningcloud.com/sentiment-2.1',
    application_key: process.env.API_KEY,
})
// console.log(`Your API Key is ${textapi.application_key}`)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('dist/index.html'))
})

app.post('/analyze', async function(req, res) {
    console.log("/analyze endpoint is called!")
    const {url} = req.body
    console.log('The Input:', url)
    // const analyzeUrl = `${textapi.url}?key=${textapi.application_key}&url=${urlInput}&lang=en`

    const response = await fetch(`${textapi.url}?key=${textapi.application_key}&url=${url}&lang=en`)
    const recievedData = await response.json()
    console.log(recievedData)
    res.send(recievedData)

    const collectData = {
        confidence : recievedData.confidence,
        irony : recievedData.irony,
        subjectivity : recievedData.subjectivity
    }
    res.send(collectData);

})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
