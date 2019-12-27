
const express = require('express'),
    https = require("https"),
    fs = require("fs"),
    path = require("path")

const options = {
  key: fs.readFileSync(path.resolve(__dirname, "./assets/server.key")),
  cert: fs.readFileSync(path.resolve(__dirname, "./assets/server.crt"))
}

const app = express()

app.use((req, res) => {
  res.writeHead(200)
  res.end("hello world\n")
})

app.listen(80)

https.createServer(options, app).listen(443)

