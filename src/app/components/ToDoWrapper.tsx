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
  const [filter, setFilter] = useState<string>("all");

  const addTodo = (newTask: SingleTask) => {
    setTodos([...todos, newTask]);
  };

  const handleFormOpen = () => {
    setShowForm(!showForm);
  };

  const toggleTaskStatus = (id: number) => {
    const toggledTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(toggledTodos);
  };
  const editTask = (id: number, updatedName: string, updatedDesc: string) => {
    const updatingTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, name: updatedName, description: updatedDesc };
      }
      return todo;
    });
    setTodos(updatingTodo);
  };
  const deleteTask = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return todo.completed;
    } else {
      return !todo.completed;
    }
  });

  return (
    <div>
      <span className="text-4xl text-white font-bold block mx-auto py-3">
        ToDo Application
      </span>
      <div className="flex flex-row items-center justify-around w-1/2 mt-6 mx-auto">
        <div>
          <span className="text-white px-2 text-xl">Filter By:</span>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="bg-transparent border p-1 rounded text-black"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
        </div>
        <div>
          <button
            className="border rounded bg-blue-600 py-1 px-2 text-white text-xl"
            onClick={handleFormOpen}
          >
            Create Task
          </button>
        </div>
      </div>
      {showForm && <ToDoForm onCancel={handleFormOpen} addTodo={addTodo} />}
      <div className="grid grid-cols-4 gap-2 w-3/4 mt-20 mx-auto">
        {filteredTodos.map((todo) => (
          <ToDoCard
            key={todo.id}
            todo={todo}
            toggleTaskStatus={toggleTaskStatus}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDoWrapper;
