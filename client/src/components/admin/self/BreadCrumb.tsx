import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * 
 * @pathName
 * @path enter your path like "nav-item" converts to "/admin/nav-item"
 * 
 */

const className = "cursor-pointer underline-offset-4 hover:opacity-100 hover:bg-gray-100 hover:dark:text-black hover:dark:opacity-100 transition-all duration-100 opacity-30 dark:opacity-70 py-1 px-2 rounded-md capitalize "

const BreadCrumb = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getLocation = useMemo(() => {
    const splitted = location.pathname.slice(1).split("/");
    return splitted
  }, [location.pathname])

  return (
    <ul className="flex-center">
      {
        getLocation.length > 1 &&
        getLocation?.map((v, index) => (
          <div className="flex-center" key={v}>
            {index != 0 && <span className="mx-1 pointer-events-none opacity-30">/</span>}
            < li className={className + (index == getLocation.length - 1 ? "!opacity-100" : "")}
              onClick={() => navigate(`/${getLocation.slice(0, index + 1).join("/")}`)}>{v.replace("-", " ")}</li>
          </div>
        ))
      }
    </ul >
  )
}

export default BreadCrumb