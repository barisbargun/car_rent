import { PageLoader, BreadCrumb, SideNav, HandleErrorComponent } from "@/components";
import { _useContext } from "@/context/Context";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { PATH_LIST } from "@/constants/enum";

const AdminHomeLayout = () => {
  const { isLogin } = _useContext();
  const location = useLocation();

  return (
    isLogin == false ? <Navigate to={PATH_LIST.LOGIN} /> : isLogin == undefined ? <PageLoader /> :
      <>
        <header className="top-0 left-0 w-screen h-screen lg:pt-adminLayout pt-4 max-desktop:px-4">
          <SideNav />
        </header>



        <main
          className="absolute max-desktop:w-screen max-desktop:h-[calc(100vh_-_100px)] w-[85%] h-[calc(100vh_-_120px)] bottom-0 right-0 z-50">

          <div className="max-desktop:hidden absolute top-[-30px] left-2">
            <BreadCrumb />
          </div>
          <div className="overflow-auto h-full min-w-full p-4">
            <ErrorBoundary
              FallbackComponent={HandleErrorComponent}
              key={location.pathname}
            >
                <Outlet />
            </ErrorBoundary>
          </div>

        </main>
      </>
  )
}

export default AdminHomeLayout