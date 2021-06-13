const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TweetPosts = new Schema({
    userId:{
        type:String,
        trim:true,
    },
    likes:{
        type:Schema.Types.ObjectId,ref:'twits'}
    
});
const TwittPost = mongoose.model('Likes',TweetPosts);

module.exports = TwittPost; 