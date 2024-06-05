"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
router.post('/addTodo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, userId } = req.body;
    const newTask = yield prisma.task.create({
        data: {
            title: title,
            description: description,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });
    res.status(201).json({ success: true, message: "New task added successfully!", newTask });
}));
router.get('/getTodo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const tasks = yield prisma.task.findMany({
        where: {
            userId: userId
        },
        include: {
            user: true
        }
    });
    res.status(200).json({ success: true, tasks });
}));
router.patch('/todoDone', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.body;
    const task = yield prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            done: true
        }
    });
    res.status(200).json({ success: true, message: "Task updated successfully!", task });
}));
module.exports = router;
