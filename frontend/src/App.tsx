import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage/LandingPage";
import './index.css';
import ChatPage from "./pages/chatpage/ChatPage";
import FriendPage from "./pages/friendpage/FriendPage";
import StartPage from "./pages/startpage/StartPage";
import WallPage from "./pages/wallpage/WallPage";
import KrypinPage from "./pages/krypinpage/KrypinPage";
import WorkSpace from "./pages/workspace/WorkSpace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/friends" element={<FriendPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/wall" element={<WallPage />} />
        <Route path="/krypin" element={<KrypinPage />} />
        <Route path="/workspace" element={<WorkSpace />} />
        <Route path="/friendpage" element={<FriendPage />} />
      </Routes>
    </Router>
  );
}

export default App;
