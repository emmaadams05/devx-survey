import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SurveyPage from "./ui/SurveyPage";
import Finish from "./ui/Finish";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/survey/0" replace />} />
        <Route path="/survey/:page" element={<SurveyPage />} />
        <Route path="/finish" element={<Finish />} />
      </Routes>
    </BrowserRouter>
  );
}