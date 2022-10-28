//import express from 'express';

import { Router } from "express"; // allows us to only import Router.

import{Todo} from '../models/todo';

let todos: Todo[] =[];

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});

router.post('/todo', (req, res, next) => {
    const newTodo: Todo ={  // we set its type to Todo to force TS to force us to enter correct data as specified in Todo only.
        id: new Date().toISOString(),
        text: req.body.text
    }; 

    todos.push(newTodo);
    res.status(200).json({message: "successful", todos: todos});
});

router.delete('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== tid); 
    // filter and keeps only those items in array that do not match id to be deleted
    res.status(200).json({message: "successful delete", todos: todos});
});

router.put('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if(todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: req.body.text
        }
        return res.status(200).json({message: "updated", todos: todos});
    }
    res.status(404).json({messgae: "could not find"});
})

export default router;