"use strict"

function route(pathname, handler, request, response) {
    if (typeof handler[pathname] === "function") {
        console.log("Route to " + pathname)
        return handler[pathname](request, response)
    }
    else {
        console.log("No request handler found for " + pathname)
        response.statusCode = 404
        response.setHeader("Content-Type", "text/plain")
        response.write("404 Not found")
        response.end()
    }
}

//Public API
exports.route = route