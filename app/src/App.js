import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Form/Login";
import Register from "./pages/Form/Register.jsx";
import Home from "./pages/Home/Home.jsx";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            index
            element={<Login />}
          />
          <Route
            path="/register"
            index
            element={<Register />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
