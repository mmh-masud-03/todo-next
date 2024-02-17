import React from "react";
import { SingleTask } from "./ToDoWrapper";
interface Props {
  todo: SingleTask;
}
function ToDoCard({ todo }: Props) {
  return (
    <div className="p-4 rounded-md shadow-md bg-gradient-to-r from-violet-700 to-fuchsia-700">
      <span className="block text-center text-white text-2xl">
        {todo?.name}
      </span>
      <p className="text-white text-left text-lg my-3">{todo?.description}</p>{" "}
    </div>
  );
}

export default ToDoCard;
