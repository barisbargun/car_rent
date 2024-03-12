import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui";
import { pageListNames } from "@/constants";
import { useGetNavItem } from "@/lib/data"
import { RowsIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type Props = {
  navImg?: IImage;
  navName?: string;
}

const Navbar = ({ navImg, navName }: Props) => {
  const { data: navData, isSuccess: navSuccess } = useGetNavItem();

  const getLogo = useMemo(() => {
    if (navImg) {
      const url = navImg.imgUrl.split("/image/upload/");
      return `${url[0]}/image/upload/w_40,h_40,c_lfill/${url[1]}`;
    }
  }, [navImg])

  const moveTop = () => {
    window.scrollTo(0, 0);
  }

  const GetLink = (title: string, link: number = 0, type: "NORMAL" | "DROPDOWN") => {
    return <Link
      className={"capitalize  text-sm  " + (type == 'NORMAL' ? "opacity-60 hover:opacity-100 transition-opacity" : "")}
      to={link == 0 ? "" : `#${pageListNames[link].toLowerCase()}`}
      target={link == 0 ? "_self" : "_top"}
      key={`${title}${link}${type}`}
    >
      {title}
    </Link>
  }
  return (
    navSuccess &&
    <nav className="fixed bg-black bg-opacity-40 
    top-0 left-0 flex-center w-full z-40 text-white shadow-md">
      <div className="pageWidth flex items-center justify-between max-lg:p-3 max-md:p-2">
        <div className="flex-center gap-4">
          {getLogo && <img className="cursor-pointer max-lg:hidden" src={getLogo || ""} alt="logo img" onClick={moveTop} />}
          <h2 className="brandText text-3xl max-lg:text-2xl cursor-pointer text-white" onClick={moveTop}>{navName}</h2>
        </div>
        <div className="flex-center gap-16 max-lg:hidden">
          {navData.slice().sort((a, b) => a.index - b.index).map(v =>
            GetLink(v.title, v.hyperLink, "NORMAL")
          )}
        </div>
        <div className="lg:hidden flex-center">
          <DropdownMenu>
            <DropdownMenuTrigger><RowsIcon className="size-4" /></DropdownMenuTrigger>
            <DropdownMenuContent className="">
              {navData.map(v =>
                <DropdownMenuItem key={v.id}>
                  {GetLink(v.title, v.hyperLink, "DROPDOWN")}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>

    </nav>
  )
}

export default Navbar