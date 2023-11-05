import { useTitle } from "../hooks/useTitle";

import RegisterNav from "../components/RegisterNav";

const Register = () => {
  useTitle("Register");

  return (
    <div>
      <RegisterNav />
    </div>
  );
};

export default Register;
