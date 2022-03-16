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

//редусеры по умолчанию
const defaultHandlers = require("react-redux-socket/server/handlers/");
//редусеры обработки экшенов сообщений
const messagesHandlers = require("./handlers/messages");
const usersHandlers = require("./handlers/users");

const ioActionHandler = require("react-redux-socket/server")(io)
  .plugins(defaultHandlers.logConnection(log))
  .plugins(messagesHandlers).log(log)
  .plugins(usersHandlers);

ioActionHandler.localDispatch({
  type: "SEND_MESSAGE",
  payload: {
    message: { value: "SERVER SIDE REDUX ACTION WORKING on start" },
  }
});

http.listen(port, function () {
  console.log(`Server listens http://${host}:${port}`);
});
