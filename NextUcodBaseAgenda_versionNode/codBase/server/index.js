require('./connetion.js'); // importa el archivo de conexión
const User = require('../model/user.js'); // importa el esquema
const Eventos = require('../model/events.js');

const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000
app.use(express.json());

app.get('/crearUsuario', function (req, res) {

    User.find({}, (err, usuarios) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: ("Error al intentar obtener los usuarios. (status:500)")
            })
        } else {
            if (usuarios.length <= 0) {
                const user = new User({
                    usuario: 'edwin',
                    password: '1234'
                }); // crea la entidad
                user.save(); // guarda en bd
            } else {
                res.status(200).json({
                    success: true,
                    message: "si se pudo",
                    payload: usuarios
                })
            }

        }
    })
})

app.post('/login', function (req, res) {

    let username = req.body.usuario
    let password = req.body.password

    User.find({
        usuario: username,
        password: password
    }, function (err, userFind) {
        if (err) {
            return res.status(500).send({
                message: 'Error al intentar obtener el usuario en el inicio de sesión. (status:500)'
            })
        } else {

            if (userFind.length == 1) {

                res.status(200).json({
                    success: true,
                    message: "Login correcto"
                })
            } else {

                res.status(401).json({
                    success: false,
                    message: "Login incorrecto"
                })

            }
        }
    })

})

app.post('/eventos', function (req, res) {

    let title = req.body.title
    let start = req.body.start
    let end = req.body.end
    try {
        const eventos = new Eventos({
            title: title,
            start: start,
            end: end
        });
        eventos.save();
    } catch (err) {
        
        res.status(400).json({
            success: false,
            message: err.message
        })
    }

    res.status(200).json({
        success: true,
        message: "Evento ingresado con exito"
    })

})

app.get('/eventList', function (req, res) {
    Eventos.find({}).then(function (events) {
        res.send(events);
    });
});

app.put('/eventUpdate/:id', async function  (req, res) {
console.log(req.params.id)



    try {
        const eventoUpdate =  await Eventos.updateOne({ _id : req.params.id}, {
            title: req.body.title,
            start: req.body.start,
            end:   req.body.end
          });

          res.status(200).json({
              success: true,
              message: "Evento actualizado"
          })
    } catch (error) {
        res.status(400).json({
            success:false,
            message: error.message
        })
        
    }

 
    
});



app.use('/', express.static('../public'));
app.listen(port, function () {
    console.log('Servidor corriendo en http://localhost:' + port)
})