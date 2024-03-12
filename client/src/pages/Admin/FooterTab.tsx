import { ToastMessage, PageLoader, OpenDialog, FooterTabCard, FooterTabForm } from "@/components"
import MaxCountComp from "@/components/MaxCountComp";
import { Button } from "@/components/ui";
import { maxCountsBySection } from "@/constants";
import { PATH_LIST } from "@/constants/enum";
import { _useMutation } from "@/lib/actions";
import { useGetFooterTab } from "@/lib/data";
import Loader from "@/svg/Loader";
import { useEffect, useMemo, useState } from "react";

const FooterTab = () => {
  const { mutateAsync: mutateSwap, isPending: pendingSwap } =
    _useMutation<IMutationBody<ISwapList>>({ models: "FOOTER_TAB", methodType: "PATCH" });

  const { data, isPending, isSuccess, isError } = useGetFooterTab();

  const toastMessage = ToastMessage();
  const [swapValue, setSwapValue] = useState<number | undefined>();
  const [isAnyChange, setIsAnyChange] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IFooterTab[] | undefined>();

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
          path: PATH_LIST.FOOTER_TAB,
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
    isPending ? <PageLoader text="Footer tabs loading.." /> : isSuccess &&
      <>
        <div className="w-full flex justify-start mb-6 gap-6">
          <Button disabled={!swapValue || pendingSwap} onClick={() => setSwapValue(undefined)} variant="destructive">Cancel Swap</Button>
          <Button disabled={!isAnyChange || pendingSwap} onClick={handlePatch}>{pendingSwap && <Loader />} Update</Button>
        </div>
        <div className="flex flex-wrap gap-4 max-desktop:justify-center">
          {getData?.map((v) => (
            <div className={"w-[350px] max-md:w-full overflow-hidden " + (pendingSwap ? "pointer-events-none" : "")} key={v.id}>
              <FooterTabCard data={v} handleSwap={handleSwap} swapValue={swapValue} />
            </div>
          ))}
        </div>

        {/** Add button */}
        {data.length < maxCountsBySection.default &&
          <div className="fixed right-10 bottom-6 z-[99]">
            <OpenDialog
              dialogProps=
              {{
                buttonText: "Add Footer tab",
                title: "Add a Footer Tab",
                desc: "Add a new Footer Tab for your website.",
                width: "w-[500px]"
              }}>
              <FooterTabForm type={"CREATE"} />
            </OpenDialog>
          </div>
        }
        <MaxCountComp count={data.length} type="default" />
      </>
  )
}

export default FooterTab