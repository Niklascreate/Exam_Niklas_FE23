import Header from "../../components/header/Header";
import NavBar from "../../components/navbar/NavBar";
import OnlineLunisar from "../../components/onlineLunisar/OnlineLunisar";
import "./ChatPage.css";

function ChatPage() {

  return (
    <div>
      <Header />
      <div className="chatpage-online-wrapper">
        <OnlineLunisar />
      </div>
      <p className="chat-errormessage">Tyvärr ligger chattfunktionen nere just nu...</p>
      <NavBar />
    </div>
  )
}

export default ChatPage
