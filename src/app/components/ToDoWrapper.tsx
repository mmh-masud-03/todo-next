"use client";
import React, { useEffect, useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDoCard from "./ToDoCard";

export interface SingleTask {
  _id?: string;
  name: string;
  description: string;
  completed: boolean;
}

function ToDoWrapper() {
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState<SingleTask[]>([]);
  const [filter, setFilter] = useState<string>("all");
  useEffect(() => {
    fetchTodos();
  }, [filter]);
  const fetchTodos = async () => {
    try {
      let url = "http://localhost:8000/api/todos/all";
      if (filter !== "all") {
        url += `?completed=${filter === "completed" ? "true" : "false"}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
        console.log(data);
      } else {
        console.log("Error fetching todos");
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = (newTask: SingleTask) => {
    setTodos([...todos, newTask]);
  };

  const handleFormOpen = () => {
    setShowForm(!showForm);
  };

  const toggleTaskStatus = async (id: string) => {
    try {
      // Fetch the task by ID
      const taskToUpdate = todos.find((todo) => todo._id === id);
      if (!taskToUpdate) {
        console.error("Task not found");
        return;
      }

      // Update the completed status
      const updatedTask = {
        ...taskToUpdate,
        completed: !taskToUpdate.completed,
      };

      // Send a PUT request to update the completed status
      const response = await fetch(
        `http://localhost:8000/api/todos/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: updatedTask.completed }),
        }
      );

      if (response.ok) {
        // If the update is successful, update the state with the updated task
        setTodos(todos.map((todo) => (todo._id === id ? updatedTask : todo)));
      } else {
        console.log("Error updating task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const editTask = async (
    id: string,
    updatedName: string,
    updatedDesc: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/todos/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: updatedName, description: updatedDesc }),
        }
      );

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      } else {
        console.log("Error updating task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/todos/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Task deleted:", id);
        setTodos(todos.filter((todo) => todo._id !== id));
      } else {
        console.log("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="w-full">
      <p className="text-4xl text-white font-bold w-full text-center py-3">
        ToDo Application
      </p>
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
        {todos.map((todo) => (
          <ToDoCard
            key={todo._id}
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
