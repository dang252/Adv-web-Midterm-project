import HomeNav from "../components/HomeNav";

import { useTitle } from "../hooks/useTitle";

const Home = () => {
  useTitle("Moodlab | Home");

  return (
    <div>
      <HomeNav />
    </div>
  );
};

export default Home;
