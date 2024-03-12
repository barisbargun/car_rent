import { PageLoader, StatisticCard } from "@/components"
import { PATH_LIST } from "@/constants/enum";
import { useGetInfo } from "@/lib/data";
import { IStatisticCard } from "@/types/exports";
import { useMemo } from "react";

const AdminHome = () => {
  const { data, isPending, isSuccess } = useGetInfo();

  const GetData = useMemo(() => {
    const list: IStatisticCard[] = [
      {
        title: "Users", desc: "Users count", link:PATH_LIST.USER,
        count: [data?.users?.editor || 0, data?.users?.user || 0], names: ["Editors", "Users"]
      },
      {
        title: "Carousels", desc: "Carousels count",link:PATH_LIST.CAROUSEL,
        count: [data?.carousel || 0], names: ["Carousels"]
      },
      {
        title: "Menubar", desc: "Menubar count",link:PATH_LIST.MENUBAR_TAB,
        count: [data?.menubar?.tab || 0, data?.menubar?.vehicle || 0], names: ["Menubar Tabs", "Menubar Vehicles"]
      },
      {
        title: "Reviews", desc: "Reviews count",link:PATH_LIST.REVIEW,
        count: [data?.review || 0], names: ["Reviews"]
      },
      {
        title: "Footers", desc: "Footers count",link:PATH_LIST.FOOTER_TAB,
        count: [data?.footer?.tab || 0, data?.footer?.link || 0], names: ["Tabs", "Links"]
      },
      {
        title: "Others", desc: "",
        count: [data?.others?.images || 0, data?.others?.vehicles || 0], names: ["Images", "Vehicles"]
      }
    ]
    return list;
  }, [data])
  return (
    isPending ? <PageLoader text="Admin home loading.." /> : isSuccess &&
      <div className="flex flex-wrap gap-4 max-desktop:justify-center w-full">
        {
          GetData.map(v =>
            <StatisticCard data={v} key={v.title}/>
          )
        }
      </div>
  )
}

export default AdminHome