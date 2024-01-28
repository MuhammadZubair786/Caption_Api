// const http = require("http");
// const express = require("express");
// const app = express();
// const server = http.createServer(app); // Create an HTTP server
// const socketIo = require("socket.io");

// const io = socketIo(server, {
//     cors: {
//         origin: "*",
//         methods: "*",
//     },
// });

// io.on("connection", (socket) => {
//     console.log(socket.id);

//     //emit when driver location update


//     socket.on("disconnect", async () => {
//         console.log(`Socket disconnected: ${socket.id}`);
//         // Additional cleanup or logic can go here if needed
//     });
// });

// module.exports = { app, server, io };