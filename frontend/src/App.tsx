import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/startpage/StartPage";
import LandingPage from "./pages/landingpage/LandingPage";
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
