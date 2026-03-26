import "@/index.css";
import { Routes, Route } from "react-router";
import LoginPage from "@/pages/login/Index";

const RemoteApp = () => {
  return (
    <div data-mfe="login">
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default RemoteApp;
