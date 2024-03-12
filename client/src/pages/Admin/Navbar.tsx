import { ToastMessage, PageLoader, OpenDialog, NavCard, NavForm, NavView } from "@/components"
import MaxCountComp from "@/components/MaxCountComp";
import { Button } from "@/components/ui";
import { maxCountsBySection } from "@/constants";
import { PATH_LIST } from "@/constants/enum";
import { _useMutation } from "@/lib/actions";
import { useGetNavItem } from "@/lib/data"
import Loader from "@/svg/Loader";
import { INavItem } from "@/types/exports";
import { useEffect, useMemo, useState } from "react";

const AdminService = () => {
  const { mutateAsync: mutateSwap, isPending: pendingSwap } =
    _useMutation<IMutationBody<ISwapList>>({ models: "NAV_ITEM", methodType: "PATCH" });

  const { data, isPending, isSuccess, isError } = useGetNavItem();

  const toastMessage = ToastMessage();
  const [swapValue, setSwapValue] = useState<number | undefined>();
  const [isAnyChange, setIsAnyChange] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<INavItem[] | undefined>();

  const getData = useMemo(() => {
    return currentData && currentData?.slice().sort((v, v1) => v.index - v1.index);
  }, [currentData])

  useEffect(() => {
    if (isError) {
      toastMessage({ defaultText: "error" });
    }
  }, [isError])

  useEffect(() => {
    setCurrentData(data);
  }, [data])

  const handleSwap = (index: number) => {
    if (swapValue == undefined) setSwapValue(index);
    else {
      setIsAnyChange(true);
      const newData = currentData?.map(v => {
        if (v.index == swapValue)
          return { ...v, index: index }
        else if (v.index == index)
          return { ...v, index: swapValue }
        return v
      }
      )
      setCurrentData(newData);
      setSwapValue(undefined);
    }
  }

  const handlePatch = async () => {
    try {
      const list = getData?.map(v => v.id);
      if (list) {
        await mutateSwap({
          path: PATH_LIST.NAV_ITEM,
          body: { list }
        });
        setIsAnyChange(false);
        return toastMessage({ defaultText: "update" });
      }
      throw Error;
    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }
  }

  return (
    isPending ? <PageLoader text="Nav items loading.." /> : isSuccess &&
      <>

        <div className="flex-center w-full desktop:!justify-start max-lg:hidden">
          <div className="w-[70%] pb-4 max-2xl:w-[90%]">
            <NavView data={getData} />
          </div>
        </div>
        <div className="w-full flex max-desktop:justify-center justify-start mb-6 gap-6">
          <Button disabled={!swapValue || pendingSwap} onClick={() => setSwapValue(undefined)} variant="destructive">Cancel Swap</Button>
          <Button disabled={!isAnyChange || pendingSwap} onClick={handlePatch}>{pendingSwap && <Loader />} Update</Button>
        </div>
        <div className="flex flex-wrap gap-4 max-desktop:justify-center">
          {getData?.map(v => (
            <NavCard data={v} key={v.id} handleSwap={handleSwap} swapValue={swapValue} />
          ))}
        </div>

        {/** Add button */}
        {data?.length < maxCountsBySection.navItem &&
          <div className="fixed right-10 bottom-6 z-[99]">
            <OpenDialog
              dialogProps=
              {{
                buttonText: "Add nav item",
                title: "Add a nav item",
                desc: "Add a new nav item for your website.",
                width: "w-[500px]"
              }}>
              <NavForm type={"CREATE"} />
            </OpenDialog>
          </div>
        }
        <MaxCountComp count={data.length} type="navItem" />

      </>
  )
}

export default AdminService

