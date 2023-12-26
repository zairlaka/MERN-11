import { useState } from "react";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";

function Layout() {
  const [isLogin, setIsLogin] = useState(true);

  const updateState = (newState) => {
    setIsLogin(newState);
  };

  return (
    <>
      {isLogin && <Login updateState={updateState} />}
      {!isLogin && <Signup updateState={updateState} />}
    </>
  );
}

export default Layout;
