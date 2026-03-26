import "@/index.css";
import { Routes, Route } from "react-router";
import CorporateListPage from "@/pages/CorporateListPage";
import CorporateDetailPage from "@/pages/CorporateDetailPage";
import { AddCorporate } from "@/pages/corporate/AddCorporate";

const RemoteApp = () => {
  return (
    <div data-mfe="corporate">
      <Routes>
        <Route path="/" element={<CorporateListPage />} />
        <Route path="/add-corporate" element={<AddCorporate />} />
        <Route path="/:corporateId" element={<CorporateDetailPage />} />
        <Route path="/corporate" element={<CorporateListPage />} />
        <Route path="/corporate/add-corporate" element={<AddCorporate />} />
        <Route path="/corporate/:corporateId" element={<CorporateDetailPage />} />
      </Routes>
    </div>
  );
};

export default RemoteApp;
