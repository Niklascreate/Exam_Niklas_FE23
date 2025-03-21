import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LandingPage from "./pages/landingpage/LandingPage";
import './index.css';
import ChatPage from "./pages/chatpage/ChatPage";
import FriendPage from "./pages/friendpage/FriendPage";
import StartPage from "./pages/startpage/StartPage";
import WallPage from "./pages/wallpage/WallPage";
import KrypinPage from "./pages/krypinpage/KrypinPage";
import UserProfilePage from "./pages/userprofilepage/UserProfilePage";
import ProtectedRoute from './utils/ProtectedRoute';

function AppWrapper() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<StartPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/friends" element={<FriendPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/wall" element={<WallPage />} />
          <Route path="/krypin" element={<KrypinPage />} />
          <Route path="/userprofilepage/:id" element={<UserProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;