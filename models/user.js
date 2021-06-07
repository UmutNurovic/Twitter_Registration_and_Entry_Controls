const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true, 
        min:3,
        
    },
    Nickname:{
        type:String,
        unique:true,
        min:3
    },
    email:{
        type: String,
        required: true, 
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    emailAktif:{
        type:Boolean,
        default:false
    },
});
const User = mongoose.model('users',userSchema);
module.exports = User;
