"use client";

import { ITask } from "@/types/task";
import { FormEventHandler, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task.text);
  const router = useRouter();

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });

    setModalEditOpen(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: String) => {
    await deleteTodo(id);
    setModalDeleteOpen(false);
    router.refresh();
  };
  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setModalEditOpen(true)}
          cursor="pointer"
          size={25}
          className="text-blue-500"
        />
        <Modal modalOpen={modalEditOpen} setModalOpen={setModalEditOpen}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input w-full"
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setModalDeleteOpen(true)}
          cursor="pointer"
          size={25}
          className="text-red-500"
        />
        <Modal modalOpen={modalDeleteOpen} setModalOpen={setModalDeleteOpen}>
          <h3 className="text-lg">
            Are you sure you want tot delete this task??
          </h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="btn btn-primary"
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
