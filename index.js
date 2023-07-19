const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const connect=require("./config/db_config")

const Group=require("./models/group")
const Chat=require("./models/chat")



app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}))



io.on('connection', (socket) => {
   console.log('a user connected');
   console.log(socket.id)

   socket.on('disconnect', () => {
      console.log('user disconnected');
    })
  
   
     socket.on("join_room",(data)=>{
        console.log("joing the room",data.roomid)
        socket.join(data.roomid)
     })
        socket.on("new_mes",(data)=>{
    
      const chat=Chat.create({
         content:data.message,
         roomid:data.roomid,
         sender:data.sender
      })
      io.to(data.roomid).emit("mess_resvd",data)

      console.log("recieved the new message ",data)
      //socket.emit("mess_resvd",data)
     //socket.broadcast.emit("mess_resvd",data)
        })
    });


 app.get("/chat/:roomid/:user",async(req,res)=>{
   const grp= await Group.findById(req.params.roomid);

const ch=await Chat.find({
     roomid: req.params.roomid});
   console.log(ch);
 

   console.log(grp)
  res.render('index',{
   roomid:req.params.roomid,
   user:req.params.user,
   name:grp.name,
   previousMessage:ch
  
    })
})


 app.get('/group',(req,res)=>{
   res.render('group')
  })

  app.post('/group',async(req,res)=>{
   await Group.create({
      name:req.body.name
   })
   res.redirect("/group")
    
  })



 
 server.listen(3008,async() => {
   console.log('listening on *:3008');
   await connect()

 });
 
 