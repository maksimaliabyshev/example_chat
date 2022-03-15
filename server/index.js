var cors = require("cors");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http).of("chat");
require("dotenv").config();

//Читаем переменные из среды исполнения
const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

const log = console.log;

//Enable All CORS Requests
app.use(cors());

app.get("/hello", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

//плагины редусеров по умолчанию
const defaultHandlers = require("react-redux-socket/server/handlers/");
//плагин
const messagesHandlers = require("./handlers/messages");

const ioActionHandler = require("react-redux-socket/server")(io)
  .plugins(defaultHandlers.logConnection(log))
  .plugins(messagesHandlers)
  .log(log);

ioActionHandler.localDispatch({
  type: "SEND_MESSAGE",
  payload: {
    message: { value: "localDispatch TEST MESSAGE" },
  },
  //   meta: {},
  //   socket_meta: {
  //     rrs_name: 'NO_NAME',
  //     user: { name: 'koko', password: '123toto', room: 'koko room' }
  //   }
});

http.listen(port, function () {
  console.log(`Server listens http://${host}:${port}`);
});
