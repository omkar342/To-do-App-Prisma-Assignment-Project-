import { Response, Request } from 'express';
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/register', async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {
            userName: userName
        }
    })

    if (existingUser) {
        return res.status(400).json({success: false, message: "Username already exists"});
    }

    else {
        const newUser = await prisma.user.create({
            data: {
                userName: userName,
                password: password
            }
        });

        res.status(201).json({success: true, newUser});
    }

});

router.post('/login', async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            userName: userName,
            password: password
        }
    });

    if(user){
        res.status(200).json({success: true, user, message: "Login successful"});
    }else{
        res.status(400).json({success: false, message: "Invalid username or password"});
    }
});

module.exports = router;