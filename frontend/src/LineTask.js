import { FaTrashAlt } from "react-icons/fa";

const LineTask = ({ task, handleCheck, handleDelete }) => {
  console.log(task.id);
  return (
    <li className="task">
      <input
        type="checkbox"
        onChange={() => handleCheck(task.id)}
        completed={task.completed}
      />
      <label
        style={task.completed ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(task.id)}
      >
        {task.itemName}
      </label>
      <FaTrashAlt
        role="button"
        tabIndex="0"
        onClick={() => handleDelete(task.id)}
        aria-label={`Delete ${task.itemName}`}
      />
    </li>
  );
}

export default LineTask;
