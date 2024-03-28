import { Header, Menubar, Paginator, VehicleCard } from "@/components";
import { Button } from "@/components/ui";
import { IHeader } from "@/types/exports";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type Props = {
  data: IMenubarTab[];
  header?: IHeader;
};

const count = 6;
const Explore = ({ header, data }: Props) => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
    setCategory(Number(searchParams.get("category")) || 0);
  }, [searchParams]);

  const getVehicleData = useMemo(() => {
    let allVehicles: IVehicle[] = [];
    if (category == 0) {
      data.map((a) =>
        a.children.map((b) => b.children.map((c) => allVehicles.push(c)))
      );
    } else {
      data.map(a => a.children.map(b => b.index == category && b.children.map(c => allVehicles.push(c))));
    }
    return allVehicles;
  }, [category]);

  return (
    data && (
      <div className="flex-center flex-col py-14 pageWidth z-20" id="explore">
        <Header header={header} defaultTitle="Explore" />
        <div className="flex-center max-md:flex-col gap-2 mt-10">
          <Button variant="outline" size="icon">
            <MixerHorizontalIcon className="size-4" />
          </Button>
          <Menubar data={data} />
        </div>
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-8 w-full my-10">
          {getVehicleData
            ?.slice((page - 1) * count, page * count)
            .sort((a, b) => a.index - b.index)
            .map((v) => (
              <VehicleCard data={v} key={v.id} />
            ))}
        </div>
        <Paginator
          length={Math.round(
            getVehicleData ? getVehicleData.length / count : 1
          )}
        />
      </div>
    )
  );
};

export default Explore;
