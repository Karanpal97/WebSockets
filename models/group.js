const mongoose=require('mongoose');

const groupSchema= mongoose.Schema({
name:{
   type:String
},
isPersonal:{
   type:Boolean,
   default:false
}


})

const group= mongoose.model('group',groupSchema);
module.exports=group