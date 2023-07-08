const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(cors());

io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("send-message", (message) => {
        io.emit("new-message", message);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
