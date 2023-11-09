import { useTitle } from "../hooks/useTitle";

const Home = () => {
  useTitle("Moodlab | Home");

  return (
    <div className="min-h-screen">
      <p className="text-center text-3xl mt-10 font-bold">Home Page</p>
    </div>
  );
};

export default Home;
