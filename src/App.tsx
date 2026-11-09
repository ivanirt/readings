import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Book from "./pages/Book";
import Directory from "./pages/Directory";
import Schedule from "./pages/Schedule";
import Portal from "./pages/Portal";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Book />} />
        <Route path="/awos" element={<Directory />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
