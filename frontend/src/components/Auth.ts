import { useSetRecoilState } from "recoil";
import { isAuthState, userInfoState } from "../recoil";
import { getUserInfo } from "../util";

// eslint-disable-next-line no-undef
const Auth = ({ children } : { children: JSX.Element }) => {
  console.log("Auth");
  const setIsAuth = useSetRecoilState(isAuthState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const getUser = async () => {
    if (!localStorage.getItem("access-token")) {
      window.location.href = "/admin/login";
      return;
    }
    // TODO
    await getUserInfo();
    setUserInfo({ id: "test001@test.com", nickName: "min", password: "" });
    setIsAuth(true);
  };

  getUser();

  return children;
};

export default Auth;
