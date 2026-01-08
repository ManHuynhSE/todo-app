import { ITask } from "./types/task";

const baseUrl = "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
    const res = await fetch(`${baseUrl}/task`,{cache:'no-store'});
    const todo = await res.json();
    return todo;
}

export const addTodo = async (todo:ITask):Promise<ITask> => {
    const res = await fetch(`${baseUrl}/task`, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(todo)
    }); 
    const newTodo = await res.json();
    return newTodo
}