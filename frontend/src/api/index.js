const port = process.env.PORT || 8085
console.log("client port : ", port)
const socket = new WebSocket(`ws://localhost:${port}/ws`);
// const socket = new WebSocket(`ws://localhost:${port}/ws`);

let connect = callBack => {
  console.log("Connecting...");

  socket.onopen = () => {
    console.log("Successfully Connected");
  };
  socket.onmessage = msg => {
    console.log("onmessage", msg);
    callBack(msg);
  };
  socket.onclose = ev => {
    console.log("Socket Closed Connection ", ev);
  };
  socket.onerror = error => {
    console.log("Socket Error: ", error);
  }
};

let sendMsg = msg => {
  console.log('sending message: ', msg);
  socket.send(msg);
};

export {connect, sendMsg}