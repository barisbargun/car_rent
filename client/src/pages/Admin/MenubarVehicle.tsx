import { ToastMessage, PageLoader, OpenDialog, MenubarVehicleForm, MenubarVehicleCards } from "@/components"
import MaxCountComp from "@/components/MaxCountComp";
import { maxCountsBySection } from "@/constants";
import { _useMutation } from "@/lib/actions";
import { useGetMenubarTab } from "@/lib/data"
import { useEffect, useMemo } from "react";

const MenubarVehicle = () => {
  const { data, isPending, isSuccess, isError } = useGetMenubarTab();
  const toastMessage = ToastMessage();

  const getCounts = useMemo(() => {
    let count = 0;
    data?.map(v => count += v.children.length);
    return count
  }, [data])

  useEffect(() => {
    if (isError) {
      toastMessage({ defaultText: "error" });
    }
  }, [isError])
  console.log(data)
  return (
    isPending ? <PageLoader text="Menubar Vehicles loading.." /> : isSuccess &&
      <>
        <div className="flex gap-8 w-fit">
          {data?.sort((a, b) => a.index - b.index).map(v => v?.children?.length > 0 && (
            <MenubarVehicleCards data={v} key={v.id} />
          ))}
        </div>

        {/** Add button */}
        {getCounts < maxCountsBySection.menubarVehicle &&
          <div className="fixed right-10 bottom-6 z-20">
            <OpenDialog
              dialogProps=
              {{
                buttonText: "Add Menubar vehicle",
                title: "Add a Menubar Vehicle",
                desc: "Add a new Menubar Vehicle for your website.",
                width: "w-[500px]"
              }}>
              <MenubarVehicleForm type={"CREATE"} />
            </OpenDialog>
          </div>
        }
        <MaxCountComp count={getCounts} type="menubarVehicle" />
      </>
  )
}

export default MenubarVehicle