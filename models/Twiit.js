const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const twittSchema = new Schema({
    twiit:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    author:{
        type:Schema.Types.ObjectId,ref:'users'
    },
    twiitImg:{
        type:String
    }
},);
const Twiit = mongoose.model('twits',twittSchema);

module.exports = Twiit; 