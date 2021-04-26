require('dotenv').config();
import express, { json, urlencoded } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import './database';
import path from "path";
import { router } from './routes';

const app = express();

const http = createServer(app);
const io = new Server(http);

app.use(json());
app.use(urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use('/api', router);

app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

export { http, io }