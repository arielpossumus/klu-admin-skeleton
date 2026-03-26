import "@/index.css";
import { Routes, Route } from "react-router";
import CommerceListPage from "@/pages/CommerceListPage";
import CommerceDetailPage from "@/pages/CommerceDetailPage";

const RemoteApp = () => {
  return (
    <div data-mfe="commerces">
      <Routes>
        <Route path="/" element={<CommerceListPage />} />
        <Route path="/:idCommerce" element={<CommerceDetailPage />} />
        <Route path="/commerces/physical" element={<CommerceListPage />} />
        <Route
          path="/commerces/physical/:idCommerce"
          element={<CommerceDetailPage />}
        />
      </Routes>
    </div>
  );
};

export default RemoteApp;
