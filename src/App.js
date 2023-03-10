import "./App.css";
import "../src/Style.scss";
import LogeIn from "./pages/LogeIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { useManage } from "./context/AuthContext";

function App() {
  const { currentUser } = useManage();

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LogeIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
