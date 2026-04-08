import "@/index.css";
import { Routes, Route } from "react-router";
import CorporateListPage from "@/pages/CorporateListPage";
import CorporateDetailPage from "@/pages/CorporateDetailPage";
import { AddCorporate } from "@/pages/corporate/AddCorporate";
import CommerceListPage from "@/pages/CommerceListPage";
import CommerceDetailPage from "@/pages/CommerceDetailPage";

/**
 * Remoto único: dominios **corporativo** y **comercios físicos** (antes `mfe-corporate` + `mfe-commerces`).
 * Rutas absolutas para el shell en `/corporate/*` y `/commerces/*`; rutas cortas para `pnpm dev` en el puerto del MFE.
 */
const RemoteApp = () => {
  return (
    <div data-mfe="entity">
      <Routes>
        <Route
          path="/commerces/physical/:idCommerce"
          element={<CommerceDetailPage />}
        />
        <Route path="/commerces/physical" element={<CommerceListPage />} />
        <Route path="/commerces" element={<CommerceListPage />} />
        <Route path="/corporate/add-corporate" element={<AddCorporate />} />
        <Route path="/corporate/:corporateId" element={<CorporateDetailPage />} />
        <Route path="/corporate" element={<CorporateListPage />} />
        <Route
          path="/physical/:idCommerce"
          element={<CommerceDetailPage />}
        />
        <Route path="/physical" element={<CommerceListPage />} />
        <Route path="/add-corporate" element={<AddCorporate />} />
        <Route path="/:corporateId" element={<CorporateDetailPage />} />
        <Route path="/" element={<CorporateListPage />} />
      </Routes>
    </div>
  );
};

export default RemoteApp;
