var mongoose=require('./db.js');


var UserSchema=mongoose.Schema({
    name:String,
    age:Number
})

module.exports=mongoose.model('user',UserSchema,'user');