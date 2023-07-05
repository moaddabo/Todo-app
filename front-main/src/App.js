import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { BACKEND_URL } from "./url";
import TodosList from "./pages/Todos/TodosList";
import UpdateTodo from "./pages/Todos/UpdateTodo";

export default function App() {
  // console.log(BACKEND_URL);

  return (
    <>
      <Routes>
        <Route path="/" element={<TodosList />} />
        <Route path="/updatetodo/:id" element={<UpdateTodo />} />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="light"
      />
    </>
  );
}
