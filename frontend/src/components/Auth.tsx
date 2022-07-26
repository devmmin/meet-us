import { Navigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getUserInfo } from "../util";
import { isAuthState, userInfoState } from "../recoil";

// eslint-disable-next-line no-undef
const Auth = ({ children }: { children: JSX.Element }) => {
  const setIsAuth = useSetRecoilState(isAuthState);
  const setUserInfo = useSetRecoilState(userInfoState);

  if (!localStorage.getItem("access-token")) {
    return <Navigate to="/admin/login" replace />;
  }

  const getUser = async () => {
    // TODO
    await getUserInfo();
    setUserInfo((prev) => ({ id: prev.id, nickName: "min", password: "" }));
    setIsAuth(true);
  };

  getUser();

  return children;
};

export default Auth;
