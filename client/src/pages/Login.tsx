import { useTitle } from "../hooks/useTitle";

import LoginNav from "../components/LoginNav";

const Login = () => {
  useTitle("Login");

  return (
    <div>
      <LoginNav />
    </div>
  );
};

export default Login;
