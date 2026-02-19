import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Deliverables from "./pages/Deliverables";
import Bios from "./pages/Bios";
import "./styles/style.css";

export default function App() {
  return (
    <>
      <NavBar />

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deliverables" element={<Deliverables />} />
          <Route path="/bios" element={<Bios />} />
        </Routes>
      </div>
    </>
  );
}
