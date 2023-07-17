document.addEventListener("DOMContentLoaded",()=>{
   var socket=io();
   let input=document.getElementById('chatBox');
   let mesgList=document.getElementById("message_list");
   let send=document.getElementById("btn");

   send.addEventListener("click",()=>{
      let mes=input.value;
      socket.emit("new_mes",{
         message:mes
      })
      input.value=""
   })
   socket.on("mess_resvd",(data)=>{
         let cre=document.createElement("li");
         cre.textContent=data.message;
         mesgList.appendChild(cre)
   })
})