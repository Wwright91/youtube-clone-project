import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import Video from "./components/Video";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search/:input" element={<SearchResults />} />
          <Route path="/videos/:id" element={<Video />} />
          <Route path="/category/:id"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
