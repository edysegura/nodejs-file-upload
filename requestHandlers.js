"use strict"

const fs = require('fs')
const formidable = require('formidable')
const util = require('util')

function start(request, response) {
    console.log('Request handler start was called')
    let fileName = './index.html'
    responseHTML(response, fileName)
}

function upload(request, response) {
    console.log('Request handler upload was called')

    var form = new formidable.IncomingForm();
    form.parse(request, function (error, fields, files) {
        //console.log(fields.title)
        //console.log(util.inspect({fields: fields, files: files}));
        if(files.image) {
            fs.readFile(files.image.path, function onReturn(error, data) {
                if (error) throw error
                fs.writeFile('./uploaded-files/test.png', data, function (error) {
                    if (error) throw error
                    fs.unlink(files.image.path)
                })
            })
        }
    });

    let fileName = "./showImage.html"
    responseHTML(response, fileName)
}

function showImage(request, response) {
    console.log('Request handler showImage was called')
    response.setHeader('Content-Type', 'image/png')
    fs.createReadStream('./uploaded-files/test.png').pipe(response)
}

function responseHTML(response, fileName) {
    fs.readFile(fileName, 'utf8', function onReturn(error, data) {
        if(error) throw error
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html')
        response.write(data)
        response.end()
    })
}

//Public API
module.exports = {
    'start': start,
    'upload': upload,
    'showImage': showImage
}