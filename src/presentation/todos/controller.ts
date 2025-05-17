import { Request, Response } from "express"
import { prisma } from "../../data/postgresql";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {

    //* DI
    constructor() { }


    public getTodos = async (request: Request, response: Response) => {

        response.json(await prisma.todo.findMany());
    }

    public async getTodoById(request: Request, response: Response) {

        const id = Number(request.params.id);
        if (isNaN(id)) {
            response.status(400).json({ error: 'ID argument is not number' });
        }

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })
        if (todo) {
            response.json(todo);
        }
        response.status(404).json({ error: `todo with ${id} not found` })

    }

    public createTodo = async (request: Request, response: Response) => {
        const [error, createTodoDto ] = CreateTodoDto.create(request.body);

        if (error) {
            response.status(400).json({ error})
        }

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        response.json(todo)
    };


    public async UpdataTodo(request: Request, response: Response) {

        const id =+ request.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...request.body, id
        })

        if(error)  response.status(400).json({error})

        const todo = await prisma.todo.findUnique({
            where: { id }
        })
        if (todo) {
            response.json(todo);
        }
        response.status(404).json({ error: `todo with ${id} not found` })

        const updata = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        });


        response.json(updata)
    };



    public async deleteTodo(request: Request, response: Response) {
        const id = Number(request.params.id);
        if (isNaN(id)) {
            response.status(400).json({ error: 'ID argument is not number' });
        }

        const todo = await prisma.todo.delete({
            where: {
                id: id
            }
        })


        response.json(todo)
    };

}