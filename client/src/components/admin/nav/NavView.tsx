import { useGetSiteValue } from "@/lib/data"
import Loader from "@/svg/Loader"
import { INavItem } from "@/types/exports"
import { useMemo } from "react"

type Props = {
  data?: INavItem[]
}

const NavView = ({ data }: Props) => {
  const { data: siteData, isPending } = useGetSiteValue();

  const getNavImg = useMemo(() => {
    if (siteData?.length && siteData[0].navImg?.imgUrl) {
      let url: any = siteData[0].navImg?.imgUrl;
      if (url) {
        url = url.split("/image/upload/");
        url = `${url[0]}/image/upload/w_48,h_48,c_lfill/${url[1]}`;
      }
      return url;
    }

  }, [siteData && siteData[0].navImg?.imgUrl])

  return (
    isPending ? <div className="flex gap-1 p-4 items-center"><Loader /> Navbar view loading</div> :
      <div className="bg-white shadow-lg dark:bg-black bg-opacity-50 w-full p-4 flex items-center justify-between h-16">
        <div className="flex-center gap-5">
          {
            siteData &&
            <>
              {getNavImg && <img src={getNavImg || ""} alt="nav img" />}
              <h3 className="brandText text-2xl">{siteData[0].navName}</h3>
            </>
          }
        </div>
        <div className="flex-center gap-10 mr-5">
          {data && data.map(v => (
            <p className="cursor-pointer capitalize opacity-60 text-sm hover:opacity-100 transition-opacity" key={v.id}>{v.title}</p>
          ))}
        </div>
      </div>
  )
}

export default NavView