import { ToastMessage, PageLoader, OpenDialog, AdminServiceCard, ServiceForm } from "@/components"
import MaxCountComp from "@/components/MaxCountComp";
import { maxCountsBySection, serviceDirection } from "@/constants";
import { _useMutation } from "@/lib/actions";
import { useGetService } from "@/lib/data"
import { useEffect } from "react";

const AdminService = () => {
  const { data, isPending, isSuccess, isError } = useGetService();
  const toastMessage = ToastMessage();

  useEffect(() => {
    if (isError) {
      toastMessage({ defaultText: "error" });
    }
  }, [isError])

  return (
    isPending ? <PageLoader text="Services loading.." /> : isSuccess &&
      <>
        <div className="flex flex-wrap gap-4 max-desktop:justify-center">
          {data.slice(0, 5).map((v, index) => (
            <AdminServiceCard data={v} key={v.id} direction={serviceDirection[index]} />
          ))}
        </div>

        {/** Add button */}
        {data?.length < maxCountsBySection.service &&
          <div className="fixed right-10 bottom-6 z-[99]">
            <OpenDialog
              dialogProps=
              {{
                buttonText: "Add Service",
                title: "Add a Service",
                desc: "Add a new Service for your website.",
                width: "w-[500px]"
              }}>
              <ServiceForm type={"CREATE"} />
            </OpenDialog>
          </div>
        }
        <MaxCountComp count={data.length} type="service" />

      </>
  )
}

export default AdminService