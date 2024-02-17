import { SingleTask } from "./ToDoWrapper";
interface Props {
  todo: SingleTask;
  toggleTaskStatus: (id: number) => void;
}
function ToDoCard({ todo, toggleTaskStatus }: Props) {
  const handleCheckboxChange = () => {
    toggleTaskStatus(todo.id);
  };
  return (
    <div className="p-4 rounded-md shadow-md bg-gradient-to-r from-violet-700 to-fuchsia-700">
      <div className="flex flex-row items-baseline mb-2">
        {" "}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
          className="text-white"
        />
        <span className="block text-center text-white text-2xl ml-6">
          {todo?.name}
        </span>
      </div>
      <hr />
      <p className="text-white text-left text-lg my-3">
        {todo?.description}
      </p>{" "}
    </div>
  );
}

export default ToDoCard;
