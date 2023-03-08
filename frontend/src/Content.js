import TaskList from "./TaskList";

const Content = ({ tasks, handleCheck, handleDelete }) => {
  return (
    <>
      {tasks.length ? (
        <TaskList
          tasks={tasks}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>You don't have any tasks.</p>
      )}
    </>
  );
};

export default Content;
