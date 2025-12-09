import { Navigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext";

export default function ProtectedRoute({ 
  children 
}) {

  const { isAuthenticated } = useUserContext();

  if  (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    console.log(isAuthenticated),
    
    children
  );
}
