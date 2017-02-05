"use strict"

const server = require("./server.js")
const router = require("./router.js")
const requestHandlers = require("./requestHandlers.js")

let handler = {}
handler["/"] = requestHandlers.start
handler["/upload"] = requestHandlers.upload
handler["/show"] = requestHandlers.show

server.start(router.route, handler)