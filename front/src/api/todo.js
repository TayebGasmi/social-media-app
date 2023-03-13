import AxiosInstance from "../utils/axiosInstance";
export const getTods = async () => {
  try {
    const response = await AxiosInstance.get("/todos");
    return response.data;
  } catch (error) {
    return;
  }
};
export const createTodo = async (values) => {
  try {
    const response = await AxiosInstance.post("/todos", values);
    return response.data;
  } catch (error) {
    return;
  }
};
export const updateTodo = async (id, values) => {
  try {
    const response = await AxiosInstance.patch(`/todos/${id}`, values);
    return response.data;
  } catch (error) {
    return;
  }
};
export const deleteTodo = async (id) => {
  try {
    const response = await AxiosInstance.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    return;
  }
};
