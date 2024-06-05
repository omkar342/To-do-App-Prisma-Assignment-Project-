import { Response, Request } from 'express';
const router = require('express').Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/addTodo', async (req: Request, res: Response) => {
    const { title, description, userId } = req.body;

    const newTask = await prisma.task.create({
        data: {
            title: title,
            description: description,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })

    res.status(201).json({success: true, message: "New task added successfully!" , newTask});
});

router.get('/getTodo', async (req: Request, res: Response) => {
    const {userId} = req.body;

    const tasks = await prisma.task.findMany({
        where: {
            userId: userId
        },
        include: {
            user: true
        }
    });

    res.status(200).json({success: true, tasks});
});

router.patch('/todoDone', async (req: Request, res: Response) => {
    const {taskId} = req.body;

    const task = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            done: true
        }
    })

    res.status(200).json({success: true, message: "Task updated successfully!", task});
})

module.exports = router;