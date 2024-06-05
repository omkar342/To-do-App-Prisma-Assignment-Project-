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
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const existingUser = yield prisma.user.findUnique({
        where: {
            userName: userName
        }
    });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Username already exists" });
    }
    else {
        const newUser = yield prisma.user.create({
            data: {
                userName: userName,
                password: password
            }
        });
        res.status(201).json({ success: true, newUser });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const user = yield prisma.user.findUnique({
        where: {
            userName: userName,
            password: password
        }
    });
    if (user) {
        res.status(200).json({ success: true, user, message: "Login successful" });
    }
    else {
        res.status(400).json({ success: false, message: "Invalid username or password" });
    }
}));
module.exports = router;
