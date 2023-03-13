import React from "react";
import List from "../List/List";
import TodoForm from "./../Form/Form";
const TodoList = () => {
  return (
    <div className="containerr">
      <div className="d-flex gap-5">
        <div className="app-wrapper">
          <div className="header">
            <h1>Todo List</h1>
          </div>
          <div>
            <TodoForm />
          </div>
          <div>
            <List />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TodoList;
