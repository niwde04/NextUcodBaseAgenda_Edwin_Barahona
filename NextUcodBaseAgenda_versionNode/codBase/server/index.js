var http        = require('http'),
    express     = require('express')


var port    = port = process.env.PORT || 3000,
    app     = express(),
    Server  = http.createServer(app)

    app.use('/',express.static('../public'))


    app.listen(port, function(){
        console.log ("server is running on port: http://localhost:"+port)

    })

