import { useSelector } from "react-redux";
import { useTitle } from "../hooks/useTitle";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { getUserInfo, handleRefreshToken } from "../redux/reducers/user.reducer";

const Home = () => {
  useTitle("Moodlab | Home");

  const dispathAsync = useAppDispatch();

  const userId = useSelector<RootState, string | undefined>(
    (state) => state.user.userId
  );

  const username = useSelector<RootState, string | undefined>(
    (state) => state.user.username
  );

  console.log(username)

  useEffect(() => {
    if (userId != null) {
      const promise = dispathAsync(getUserInfo({ userId: userId }));

      promise.unwrap().then((res) => {
        // console.log("check res get user Info:", res);
      });

      promise.unwrap().catch((err) => {
        // console.log("Check err get user info:", err);
        if (err.response.status == 403) {
          dispathAsync(handleRefreshToken())
            .catch(
              (err) => {
                console.log(err)
              });
          //try again
          dispathAsync(getUserInfo({ userId: userId }))
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])


  return (
    <div className="min-h-screen">
      <p className="text-center text-3xl mt-10 font-bold">Home Page</p>
      <p className="text-center text-3xl mt-10 font-bold">Wellcome,
        {username == " " ? <span>Anonymous</span> : <span>{username}</span>}
      </p>

    </div>
  );
};

export default Home;
