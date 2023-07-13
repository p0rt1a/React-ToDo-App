import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 0,
      title: "Task I",
      isDone: false,
    },
    {
      id: 1,
      title: "Task II",
      isDone: false,
    },
    {
      id: 2,
      title: "Task III",
      isDone: true,
    },
  ]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  let task = {
    id: tasks.length,
    title: "",
    isDone: false,
  };

  const onChange = (e) => {
    task.title = e.target.value;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setTasks([...tasks, task]);
  };

  const removeTask = (id) => {
    let newTasksList = tasks.filter((item) => item.id !== id);

    setTasks(newTasksList);
  };

  useEffect(() => {
    console.log(tasks);

    setFilteredTasks(tasks);
  }, [tasks]);

  return (
    <div className="container">
      <header>
        <h1>TO-DOS</h1>
      </header>

      <div className="todo-list">
        <form onSubmit={onSubmit}>
          <input placeholder="What needs to be done?" onChange={onChange} />
        </form>

        <div className="list">
          <ul>
            {filteredTasks.map((item, i) => {
              return (
                <li key={i}>
                  <h3>{item.title}</h3>
                  <div className="task-operations">
                    {!item.isDone && (
                      <small
                        onClick={() => {
                          item.isDone = true;
                          setFilteredTasks(tasks);
                        }}
                      >
                        Done
                      </small>
                    )}
                    <small
                      onClick={() => {
                        let taskList = tasks.filter(
                          (task) => task.id !== item.id
                        );

                        setTasks(taskList);

                        setFilteredTasks(tasks);
                      }}
                    >
                      Remove
                    </small>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navigations">
          <small
            onClick={() => {
              setFilteredTasks(
                tasks.filter((item) => {
                  return item.title.includes("");
                })
              );
            }}
          >
            All
          </small>
          <small
            onClick={() => {
              setFilteredTasks(
                tasks.filter((item) => {
                  return item.isDone == false;
                })
              );
            }}
          >
            Active
          </small>
          <small
            onClick={() => {
              setFilteredTasks(
                tasks.filter((item) => {
                  return item.isDone == true;
                })
              );
            }}
          >
            Completed
          </small>
        </div>
      </div>
    </div>
  );
}

export default App;
