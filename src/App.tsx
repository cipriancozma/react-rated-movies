import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";
import { Movie } from "./pages/movie";
import { TV } from "./pages/tv";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/rated" element={<h1>Rated</h1>} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tv/:id" element={<TV />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
