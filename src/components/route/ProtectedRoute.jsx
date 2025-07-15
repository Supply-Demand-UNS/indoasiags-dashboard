import { Navigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export function ProtectedRoute({ children }) {
  const { profile, isLoading } = useAuth();

  if (!profile && !isLoading) {
    return <Navigate to={"/"} />;
  }

  return children;
}
