import { ModeToggle } from "@/components/ModeToggle";
import { PageLoader, LoginForm } from "@/components";
import { PATH_LIST } from "@/constants/enum";
import { _useContext } from "@/context/Context";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { isLogin } = _useContext();

  return (
    isLogin ? <Navigate to={`/${PATH_LIST.ADMIN}`} /> :
      isLogin == undefined ? <PageLoader /> :
        <>
        <div className="absolute right-4 pt-4"><ModeToggle/></div>
        
          <div className="flex-center w-full h-screen">
            <div className="flex flex-col p-8 rounded-xl shadow-2xl w-[350px] max-sm:w-[95%] text-pretty">
              <LoginForm />
            </div>
          </div>
        </>
  )
}

export default Login