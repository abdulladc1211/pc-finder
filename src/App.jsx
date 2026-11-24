import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PCDetail from "./pages/PCDetail";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pc/:id" element={<PCDetail />} />
      </Routes>
    </div>
  );
}

export default App;