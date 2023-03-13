import React from "react";
import { Formik, Form } from "formik";
import { todoSchema } from "./../../schemas/todo.schema";
import NormalInputText from "./../../layout/form/input/NormalInputText";
import TextArea from "./../../layout/form/input/TextArea";
import { createTodo } from "../../api/todo";
const TodoForm = () => {
  const initialValues = {
    title: "",
    description: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={todoSchema}
      onSubmit={async (values) => {
        try {
          await createTodo(values);
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form d-flex flex-row">
          <NormalInputText
            label="Title"
            name="title"
            type="text"
            placeholder="Enter a Title.."
            className="task-input"
          />
          <TextArea
            label="Description"
            name="description"
            type="text"
            placeholder="Enter a Description.."
            className="task-input mt-4"
          />
          <button className="button-add" type="submit">
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TodoForm;
