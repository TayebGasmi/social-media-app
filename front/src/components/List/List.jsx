import React from "react";
import { deleteTodo, getTods } from "./../../api/todo";

const List = () => {
  const [todos, setTods] = React.useState([]);
  React.useEffect(() => {
    getTods().then((res) => setTods(res.todos));
  }, [todos]);
  const handleDelete = (_id) => {
    deleteTodo(_id);
  };
  return (
    <div>
      {todos.map((todo, key) => (
        <li className="list-item" key={key}>
          <input
            type="text"
            value={todo.title}
            onChange={(e) => e.preventDefault()}
            className="list"
          />
          <input
            type="text"
            value={todo.description}
            onChange={(e) => e.preventDefault()}
            className="list"
          />
          <div>
            <button className="button-complete task-button">
              <i className="fa fa-check-circle"></i>
            </button>
            <button className="button-edit task-button">
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="button-delete task-button"
              onClick={(e) => handleDelete(todo._id)}
            >
              <i className="fa fa-trash-o"></i>
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default List;
