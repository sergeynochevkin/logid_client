import { useContext, useEffect } from "react";
import { FetcherContext, UserContext, UserInfoContext } from "..";
import { fetchUserInfo } from "../http/userInfoApi";
import { fetchUser } from "../http/userAPI";

export const useFetcherUserInfo = (imageHandler) => {
  const { user } = useContext(UserContext);
  const { UserInfo } = useContext(UserInfoContext);
  const { fetcher } = useContext(FetcherContext);

  async function fetch() {
    await fetchUser(user.user.id).then((data) => {
      user.setUser(data);
    });
    await fetchUserInfo(user.user.id).then((data) => {
      UserInfo.setUserInfo(data);
      imageHandler([data]);
    });
  }
  useEffect(() => {
    fetcher.user_info && fetch();
    fetcher.setUserInfo(false);
  }, [fetcher.user_info]);

  return [];
};
