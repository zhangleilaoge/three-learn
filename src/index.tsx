import { createRoot } from "react-dom/client";
import "./style/main.scss";
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cube from "./pages/cube";
import Line from "./pages/line";
import Text from "./pages/text";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cube" element={<Cube />} />
        <Route path="/line" element={<Line />} />
        <Route path="/text" element={<Text />} />
        <Route path="*" element={<Cube />} />
      </Routes>
    </Router>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
