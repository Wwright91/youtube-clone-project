import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Home Comp/NavBar";
import Home from "./components/Home Comp/Home";
import About from "./components/About Comp/About";
import Video from "./components/Video Comp/Video";
import SearchResults from "./components/Search Comp/SearchResults";
import Category from "./components/Category Comp/Category";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:input" element={<SearchResults />} />
          <Route path="/search/:input/:num" element={<SearchResults />} />
          <Route path="/videos/:id" element={<Video />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
