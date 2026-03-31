import "@/index.css";
import { Routes, Route } from "react-router";
import CommerceListPage from "@/pages/CommerceListPage";
import CommerceDetailPage from "@/pages/CommerceDetailPage";

const RemoteApp = () => {
  return (
    <div data-mfe="commerces">
      <Routes>
        <Route path="/" element={<CommerceListPage />} />
        <Route path="/physical" element={<CommerceListPage />} />
        <Route
          path="/physical/:idCommerce"
          element={<CommerceDetailPage />}
        />
      </Routes>
    </div>
  );
};

export default RemoteApp;
