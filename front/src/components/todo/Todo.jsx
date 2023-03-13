import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
import { Typography } from "@mui/material";
import TodoList from "./../todoList/TodoList";

const Todo = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h5" color="primary">
            My Tasks
          </Typography>
        </Toolbar>
      </AppBar>
      <TodoList />
    </>
  );
};

export default Todo;
