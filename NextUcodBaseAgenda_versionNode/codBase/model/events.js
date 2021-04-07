const mongoose = require('mongoose')
const	eventSchema = new mongoose.Schema({

title: String,
start: String,
end: String
})


const Events = mongoose.model('Events', eventSchema);

module.exports = Events;



