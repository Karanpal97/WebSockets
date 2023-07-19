const mongoose=require('mongoose');

const chatSchema= new mongoose.Schema({
content:{
   type:String
},

roomid:{
   type:mongoose.Schema.Types.ObjectId
},
sender:{
   type:String
}


})

const chat= mongoose.model('chat',chatSchema);
module.exports=chat