import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-2xl font-bold">To-do List App</h1>
        <AddTask />
        <TodoList tasks={tasks} />
      </div>
    </main>
  );
}
