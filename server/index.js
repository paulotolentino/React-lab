var WebSocketServer = require("ws").Server; // webSocket library

const port = process.env.PORT || 1337;

// create the server
const wsServer = new WebSocketServer(
  {
    port,
  },
  () => {
    console.log(`server up, listening on port ${port}`);
  }
);
var clients = new Array();

// ------------------------ webSocket Server functions
function handleConnection(client, request) {
  console.log("New Connection"); // you have a new client
  clients.push(client); // add this client to the clients array

  function endClient() {
    // when a client closes its connection
    // get the client's position in the array
    // and delete it from the array:
    var position = clients.indexOf(client);
    clients.splice(position, 1);
    console.log("connection closed");
  }

  // if a client sends a message, print it out:
  function clientResponse(data) {
    console.log(request.connection.remoteAddress + ": " + data);
    // Process WebSocket message
    console.log("data", "" + data);
    const utf8Data = JSON.parse("" + data);
    const reponseData = {
      message: `${utf8Data.sender}: ${utf8Data.message}`,
      id: Math.random(),
      sender: utf8Data.sender,
    };
    broadcast(reponseData);
  }

  // set up client event listeners:
  client.on("message", clientResponse);
  client.on("close", endClient);
}

// This function broadcasts messages to all webSocket clients
function broadcast(data) {
  // iterate over the array of clients & send data to each
  for (c in clients) {
    clients[c].send(JSON.stringify(data));
  }
}

wsServer.on("connection", handleConnection);
