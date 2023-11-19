import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeRouter from "./pages/HomeRouter";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { stopLoad } from "./redux/reducers/user.reducer";

const App = () => {
  const dispathAsync = useAppDispatch();

  useEffect(() => {
    const stopLoading = () => {
      dispathAsync(stopLoad())
    }
    window.addEventListener('beforeunload', stopLoading)

    return () => {
      window.removeEventListener('beforeunload', stopLoading)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/*" element={<HomeRouter />} />
      </Routes>
    </>
  );
};

export default App;
