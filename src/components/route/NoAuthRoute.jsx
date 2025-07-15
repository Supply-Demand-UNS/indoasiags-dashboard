import { Navigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export function NoAuthRoute({ children }) {
  const { profile, isLoading } = useAuth();

  if (profile && !isLoading) {
    return <Navigate to={"/dashboard/setting"} />;
  }

  return children;
}
