import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import './index.css'
import Login from "./pages/Login";
import { AuthProvider } from "./lib/AuthContext";
import ProtectedRoute from "./lib/ProtectedRoute";
import OnBoarding from "./pages/OnBoarding";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Business from "./pages/Business";
import FindAMate from "./pages/FindAMate";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Conversation from "./pages/Conversation";

const App = () => {
  

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Register />} path="/register"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Welcome />} path="/"></Route>
          <Route path="/onboarding" element={<ProtectedRoute />}>
            <Route path="" element={<OnBoarding />} />
          </Route>
          <Route path="/home" element={<ProtectedRoute />}>
            <Route path="" element={<Home />} />
          </Route>
          <Route path="/business/:id" element={<ProtectedRoute />}>
            <Route path="" element={<Business />} />
          </Route>
          <Route path="/business/:id/find" element={<ProtectedRoute />}>
            <Route path="" element={<FindAMate />} />
          </Route>
          <Route path="/profile/:id" element={<ProtectedRoute />}>
            <Route path="" element={<Profile />} />
          </Route>
          <Route path="/messages" element={<ProtectedRoute />}>
            <Route path="" element={<Messages />} />
          </Route>
          <Route path="/messages/:id" element={<ProtectedRoute />}>
            <Route path="" element={<Conversation />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
