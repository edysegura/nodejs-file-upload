"use strict"

const http = require("http")
const url = require("url")
const hostname = "localhost"
const port = 9000

function start(route, handler) {
    http
        .createServer(onRequest)
        .listen(port, onStart)

    function onRequest(request, response) {
        console.log("Request for: " + request.url)
        console.log("HTTP Method: " + request.method)

        let pathname = url.parse(request.url).pathname
        route(pathname, handler, request, response)
    }
}

function onStart() {
    console.log(`Server started at http://${hostname}:${port}`)
}

//Public API
exports.start = start