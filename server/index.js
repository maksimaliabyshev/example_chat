const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config();

//Читаем переменные из среды исполнения
const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

//Выпролняется каждый раз при новом подключении
io.on('connection', function(socket) {
    console.log('A user Connected');

   //Подписываемся на канал события отправленного сообщения
   socket.on('chat_message', (data) => {
        //тут же отправляем всем клиентам полученные данные
        io.emit('chat_message', {
            name: data.name,
            message: data.message,
        })
   });
   //Слушаем канал 
   socket.on('user_status', (data) => {
        //Отправляем всем клиентам полученные данные
        io.emit('chat_message', {
            name: data.name,
            status: data.status,
        })
   });

   //Выполняется каждый раз при отключении
   socket.on('disconnect', function () {
      console.log('A user Disconnected');
   });
});

http.listen(port, function() {
   console.log(`Server listens http://${host}:${port}`)
});