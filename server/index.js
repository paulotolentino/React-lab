var WebSocketServer = require("ws").Server; // webSocket library
const express = require("express");

const PORT = process.env.PORT || 1337;

function heartbeat() {
  this.isAlive = true;
}

// create the server
const server = express().listen(PORT, () =>
  console.log(`Listening on ${PORT}`)
);
const wsServer = new WebSocketServer(
  {
    server,
  },
  () => console.log(`WebSocket UP`)
);
var clients = new Array();

// ------------------------ webSocket Server functions
function handleConnection(client, request) {
  console.log("New Connection"); // you have a new client
  clients.push(client); // add this client to the clients array

  client.isAlive = true;
  client.on("pong", heartbeat);

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

const interval = setInterval(function ping() {
  wsServer.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 5000);

wsServer.on("connection", handleConnection);

wsServer.on("close", function close() {
  clearInterval(interval);
});
