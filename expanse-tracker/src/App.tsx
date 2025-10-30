import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Components/Pages/Dashboard";
import AddTransaction from "./Components/Pages/ExpenseForm";
import TransactionHistory from "./Components/Pages/TransactionHistory";
import LoginForm from "./Components/Auth/LoginForm";
import SignUpForm from "./Components/Auth/Signup";
import ForgotPage from "./Components/Auth/ForgotPage";
import ResetPage from "./Components/Auth/ResetPage";
import ProtectedRoute from "./Components/ProtectRoute/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgotPage" element={<ForgotPage />} />
        <Route path="/resetPage" element={<ResetPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
