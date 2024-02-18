"use client";
import { useState } from "react";
import { SingleTask } from "./ToDoWrapper";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";

interface Props {
  todo: SingleTask;
  toggleTaskStatus: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, updatedName: string, updatedDesc: string) => void;
}
function ToDoCard({ todo, toggleTaskStatus, editTask, deleteTask }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(todo.name);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleCheckboxChange = () => {
    toggleTaskStatus(todo.id);
  };
  const handleDelete = () => {
    deleteTask(todo.id);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(todo.id, editedName, editedDescription);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset edited values to original values
    setEditedName(todo.name);
    setEditedDescription(todo.description);
  };
  return (
    <div className="p-4 rounded-md shadow-md bg-gradient-to-r from-violet-700 to-fuchsia-700">
      <div className="flex flex-row items-baseline mb-2">
        {" "}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
          className="text-white cursor-pointer"
        />
        <span className="block text-center text-white text-2xl ml-6 line-clamp-2 break-words">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="bg-transparent focus:outline-none"
              placeholder="Task Name"
            />
          ) : (
            todo.name
          )}
        </span>
      </div>
      <hr />
      <p
        className={
          todo.completed === true
            ? "text-gray-400 line-through text-left text-lg my-3 line-clamp-5 break-words mb-5"
            : "text-white text-left text-lg my-3 line-clamp-5 break-words mb-5"
        }
      >
        {isEditing ? (
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="bg-transparent focus:outline-none"
            placeholder="Task Description"
          />
        ) : (
          todo.description
        )}
      </p>{" "}
      <div className="flex flex-row ml-40 gap-2 items-end justify-end size-14 cursor-pointer text-gray-200 ">
        {isEditing ? (
          <div className="flex flex-row justify-around -ml-24 gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-500 px-3 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-blue-500 px-3 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <PencilIcon onClick={handleEdit} />
            <TrashIcon onClick={handleDelete} />
          </>
        )}
      </div>
    </div>
  );
}

export default ToDoCard;
