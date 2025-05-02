import { BrowserRouter, Routes, Route } from "react-router-dom";
import appStyles from "./styles/App.module.css"; 
import HomePage from "./pages/Mainpage.jsx";
import UserLogin from "./pages/Login.jsx";
import UserSignup from "./pages/Signup.jsx";
import Dashboard from "./pages/Chatdashboard.jsx";
import BotChat from "./pages/Chatbot.jsx";
import { ChatBotProvider } from "./context/BotContext.jsx";
import WelcomeScreen from "./pages/Landing.jsx";

function ApplicationRouter() {
  return (
    <div className={appStyles.wrapper}>
      <BrowserRouter>
        <ChatBotProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chatbot" element={<BotChat />} />
            <Route path="/landing" element={<WelcomeScreen />} />
          </Routes>
        </ChatBotProvider>
      </BrowserRouter>
    </div>
  );
}

export default ApplicationRouter;
