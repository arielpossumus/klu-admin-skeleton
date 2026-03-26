import "@/index.css";
import { Routes, Route } from "react-router";
import PosHealthListPage from "@/pages/PosHealthListPage";
import PosHealthDetailPage from "@/pages/PosHealthDetailPage";

const RemoteApp = () => {
  return (
    <div data-mfe="pos-health">
      <Routes>
        <Route path="/" element={<PosHealthListPage />} />
        <Route path="/:serialId" element={<PosHealthDetailPage />} />
        <Route path="/pos-health" element={<PosHealthListPage />} />
        <Route
          path="/pos-health/:serialId"
          element={<PosHealthDetailPage />}
        />
      </Routes>
    </div>
  );
};

export default RemoteApp;
