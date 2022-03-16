const handleConnectUser = function (socketEnv, next) {
  const { socket, io, dispatch, broadcast, localDispatch } = socketEnv;

  let user = socket.id;
  let message = `User connect: ${user}`;
  broadcast({
    type: "APPEND_MESSAGE",
    payload: { message },
    // payload: { value: message },
  });

  next();
};

const handleDisconnectUser = function (socketEnv, next) {
  const { socket, io, dispatch, broadcast, localDispatch } = socketEnv;

  let user = socket.id || 'not indentificate';
  let message = `User leave: ${user}`;
  broadcast({
    type: "APPEND_MESSAGE",
    // payload: { value: message },
    payload: { message },
  });

  next();
};

module.exports = function (reactReduxSocketServer) {
  reactReduxSocketServer
    .onConnect(handleConnectUser)
    .onDisconnect(handleDisconnectUser);
};
