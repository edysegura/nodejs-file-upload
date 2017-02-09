"use strict"

const fs = require('fs')
const formidable = require('formidable')
const util = require('util')

function start(request, response) {
    console.log('Request handler start was called')
    let fileName = "./index.html"
    responseHTML(response, fileName)
}

function upload(request, response) {
    console.log('Request handler upload was called')

    var form = new formidable.IncomingForm();
    form.parse(request, function(err, fields, files) {
      console.log(util.inspect({fields: fields, files: files}));
    });

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