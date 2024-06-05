import { Request, Response } from 'express';
const user = require('./routes/user');
const todo = require('./routes/todo');
const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response)=>{
    res.send('Hello World');
})

app.use("/api/user",user);

app.use("/api/todo",todo);

app.listen(PORT, async ()=>{
    console.log(`Server is running on port ${PORT}`);
})