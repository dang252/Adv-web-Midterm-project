import { Navigate } from "react-router-dom";

// Reduc/redux-toolkit config import
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ProtectedRoute = ({ children }: any) => {
  const accessToken: string = useSelector<RootState, string>(
    (state) => state.user.accessToken
  );

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
