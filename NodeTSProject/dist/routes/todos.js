"use strict";
//import express from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // allows us to only import Router.
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body; // we do this to avoid type errors and typos
    const newTodo = {
        id: new Date().toISOString(),
        //text: req.body.text
        text: body.text
    };
    todos.push(newTodo);
    res.status(200).json({ message: "successful", todos: todos });
});
router.delete('/todo/:todoId', (req, res, next) => {
    //const tid = req.params.todoId;
    const param = req.params;
    const tid = param.todoId;
    todos = todos.filter(todoItem => todoItem.id !== tid);
    // filter and keeps only those items in array that do not match id to be deleted
    res.status(200).json({ message: "successful delete", todos: todos });
});
router.put('/todo/:todoId', (req, res, next) => {
    const param = req.params;
    const tid = param.todoId;
    const body = req.body;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            //text: req.body.text
            text: body.text
        };
        return res.status(200).json({ message: "updated", todos: todos });
    }
    res.status(404).json({ messgae: "could not find" });
});
exports.default = router;
