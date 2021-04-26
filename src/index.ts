import { http, io } from "./app";
import { Socket } from 'socket.io';
import './websockets/client';
import './websockets/admin';

io.on("connection", (socket:Socket) => {
    console.log("connected", socket.id)
});

http.listen(3001, () => {
    console.log(`Server is running in ${process.env.BaseUrl}:${process.env.PORT}`)
});