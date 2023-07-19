const mongoose=require("mongoose")
const { db_URL}=require("./server_config")
const connect =()=>{
   mongoose.connect( db_URL)
}


module.exports=connect