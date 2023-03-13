import "./App.css";
import LoginForm from "./components/loginForm/LoginForm";
import { Route, Routes } from "react-router-dom";
import SignUpForm from "./components/signupForm/SignUpForm";
import RestPasswordForm from "./components/restPasswordForm/RestPasswordForm";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import RestePasswordToken from "./components/restPasswordToken/ResetPasswordToken";
import TodoList from "./components/todoList/TodoList";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<SignUpForm />} />
      <Route
        path="/reset-password/:user/:token"
        element={<RestPasswordForm />}
      />
      <Route path="/resetPassword" element={<RestePasswordToken />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <TodoList></TodoList>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
