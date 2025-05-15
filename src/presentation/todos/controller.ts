import { error } from "console";
import { Request, Response } from "express"

let todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy water', createdAt: new Date() },
    { id: 3, text: 'Buy butter', createdAt: new Date() },
]

export class TodosController {

    //* DI
    constructor() { }


    public getTodos = (request: Request, response: Response) => {

        response.json(todos);
    }

    public getTodoById = (request: Request, response: Response) => {

        const id = Number(request.params.id);
        if (isNaN(id)) {
            response.status(400).json({ error: 'ID argument is not number' });
        }

        const todo = todos.find((todo) => todo.id === id);
        if (todo) {
            response.json(todo);
        }
        response.status(404).json({ error: `todo with ${id} not found` })
    }

    public createTodo = (request: Request, response: Response) => {
        const { text } = request.body;

        if (!text) {
            response.status(400).json({ error: 'Text property is required' })
        }
        const newTodo = {
            id: todos.length + 1,
            text: text,
            createdAt: new Date()
        }

        todos.push(newTodo)
        response.json(newTodo);
    };


    public UpdataTodo(request: Request, response: Response) {
        const id = Number(request.params.id);
        if (isNaN(id)) {
            response.status(400).json({ error: 'ID argument is not number' });
        }

        const { text, createdAt } = request.body;


        const todo = todos.find((todo) => todo.id === id);
        if (!todo) {
            response.status(400).json({ error: `Todo with id ${id} not found` });
        }

        if (text) {
            todo && (todo.text = text)
        }
        if (createdAt) {
            todo && (todo.createdAt = new Date(createdAt))
        }




        response.json(todo)
    };



    public deleteTodo(request: Request, response: Response) {
        const id = Number(request.params.id);
        if (isNaN(id)) {
            response.status(400).json({ error: 'ID argument is not number' });
        }

        todos = todos.filter((todo) => todo.id !== id)


        response.json({message: `todo with ${id} delete`} )
    };

}