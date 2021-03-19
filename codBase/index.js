require('./server/connection.js'); // importa el archivo de conexión
const User = require('./models/user.js'); // importa el esquema

const user = new User({ name: 'eldevsin.site' }); // crea la entidad
user.save(); // guarda en bd