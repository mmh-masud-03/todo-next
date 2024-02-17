"use client";
import React, { useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDoCard from "./ToDoCard";
export interface SingleTask {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}
function ToDoWrapper() {
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState<SingleTask[]>([]);
  const addTodo = (newTask: SingleTask) => {
    setTodos([...todos, newTask]);
  };
  const handelFormOpen = () => {
    setShowForm(!showForm);
  };
  return (
    <div>
      <span className="text-4xl text-white font-bold block mx-auto py-3">
        ToDo Application
      </span>
      <div className=" flex flex-row items-center justify-around w-1/2 mt-6 mx-auto">
        <div>
          <span className="text-white px-2 text-xl">Filter By:</span>
          <select className="bg-inherit border p-1 rounded text-black">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
        </div>
        <div>
          <button
            className="border rounded bg-blue-600 py-1 px-2  text-white text-xl"
            onClick={handelFormOpen}
          >
            Create Task
          </button>
        </div>
      </div>
      {showForm && <ToDoForm onCancel={handelFormOpen} addTodo={addTodo} />}
      <div className="grid grid-cols-4 gap-2 w-3/4 mt-20 mx-auto">
        {todos.map((todo) => (
          <ToDoCard key={todo.id} todo={todo} />
        ))}{" "}
      </div>
    </div>
  );
}

export default ToDoWrapper;
