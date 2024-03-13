import { ToastMessage, PageLoader, OpenDialog, AdminVehicleCards, VehicleForm } from "@/components"
import MaxCountComp from "@/components/MaxCountComp";
import { maxCountsBySection } from "@/constants";
import { _useMutation } from "@/lib/actions";
import { useGetMenubarVehicle } from "@/lib/data"
import { useEffect, useMemo } from "react";

const AdminVehicle = () => {
  const { data, isPending, isSuccess, isError } = useGetMenubarVehicle();
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
    isPending ? <PageLoader text="Vehicles loading.." /> : isSuccess &&
      <>
        <div className="flex gap-8 w-fit">
          {data?.slice().sort((a, b) => a.index - b.index).map(v => v?.children?.length > 0 && (
            <AdminVehicleCards data={v} key={v.id} />
          ))}
        </div>

        {/** Add button */}
        {getCounts < maxCountsBySection.vehicle &&
          <div className="fixed right-10 bottom-6 z-20">
            <OpenDialog
              dialogProps=
              {{
                buttonText: "Add vehicle",
                title: "Add a vehicle",
                desc: "Add a new vehicle for your website.",
                width: "w-[500px]"
              }}>
              <VehicleForm type={"CREATE"} />
            </OpenDialog>
          </div>
        }
        <MaxCountComp count={getCounts} type="vehicle" />
      </>
  )
}

export default AdminVehicle