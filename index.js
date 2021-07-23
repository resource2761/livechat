const express=require('express');
const socket=require('socket.io');
const app=express();


app.use(express.static("public"));

const port = process.env.PORT || 3000;
var server=app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});


var upgradedServer=socket(server); // get the socket server

upgradedServer.on("connection",function(socket)
{
    socket.on('sendingMessage',function(data){
        upgradedServer.emit('broadCastMessage',data);
    })
    console.log("Websocket Connected", socket.id);
})


