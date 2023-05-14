import { Navigate, useLocation } from "react-router";
const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = localStorage.getItem("token");
  let location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
