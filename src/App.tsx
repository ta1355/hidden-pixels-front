import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 p-4 bg-gray-100 shadow">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Home
        </Link>
      </nav>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
