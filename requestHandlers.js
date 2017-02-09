"use strict"

const fs = require('fs')
const queryString = require('querystring')

function start(response) {
    console.log('Request handler "Login" was called')
    let fileName = "./index.html"
    responseHTML(response, fileName)
}

function upload(response, postData) {
    console.log('Request handler "Auth" was called')
    let fileName = "./show.html"
    responseHTML(response, fileName)
}

function responseHTML(response, fileName) {
    fs.readFile(fileName, "utf-8", function onReturn(error, data) {
        if(error) throw error
        response.statusCode = 200
        response.setHeader("Content-Type", "text/html")
        response.write(data)
        response.end()
    })
}

//Public API
module.exports = {
    'start': start,
    'upload': upload
}