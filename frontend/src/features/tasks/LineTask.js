import { FaTrashAlt } from "react-icons/fa";

const LineTask = ({ task, handleCheck, handleDelete }) => {
  console.log(task.completed);
  return (
    <li className="task">
      <input
        type="checkbox"
        onChange={() => handleCheck(task.id)}
        checked={task.completed}
      />
      <label
        style={task.completed ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheck(task.id)}
      >
        {task.taskDesc}
      </label>
      <FaTrashAlt
        role="button"
        tabIndex="0"
        onClick={() => handleDelete(task.id)}
        aria-label={`Delete ${task.taskDesc}`}
      />
    </li>
  );
}

export default LineTask;
