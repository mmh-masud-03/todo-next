import React, { useState } from "react";
import { SingleTask } from "./ToDoWrapper";

interface Props {
  onCancel: () => void;
  addTodo: (newTask: SingleTask) => void;
}

function ToDoForm({ onCancel, addTodo }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: SingleTask = {
      name: title,
      description: description,
      completed: false,
    };
    try {
      const response = await fetch("http://localhost:8000/api/todos/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const data = await response.json(); // Assuming the server returns the created task with its ID
        console.log("Task added:", data);
        addTodo(data); // Add the returned task to the list
        setTitle("");
        setDescription("");
        onCancel();
      } else {
        console.log("Error adding task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center align-items-start">
      <div className="container mx-auto my-auto">
        <form
          onSubmit={handleSubmit}
          className="max-w-md bg-gray-300 mx-auto px-3 py-6"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-left">
              Taskname
            </label>
            <input
              type="text"
              onChange={handleTitle}
              value={title}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your Task"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="text"
              className="block text-gray-700 text-sm font-bold mb-2 text-left"
            >
              Task Description
            </label>
            <input
              type="text"
              onChange={handleDescription}
              value={description}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Description"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
      <span
        className="m-5 text-white top-0 right-0 size-6"
        role="button"
        onClick={onCancel}
      >
        X
      </span>
    </div>
  );
}

export default ToDoForm;
