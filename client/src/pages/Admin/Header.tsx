import { ToastMessage, PageLoader } from "@/components"
import HeaderCard from "@/components/admin/header/HeaderCard";
import { _useMutation } from "@/lib/actions";
import { useGetHeader } from "@/lib/data"
import { useEffect } from "react";

const Header = () => {
  const { data, isPending, isSuccess, isError } = useGetHeader();

  const toastMessage = ToastMessage();

  useEffect(() => {
    if (isError) {
      toastMessage({ defaultText: "error" });
    }
  }, [isError])
  
  return (
    isPending ? <PageLoader text="Headers loading.." /> : isSuccess &&
      <>
        <div className="flex flex-wrap gap-4 max-desktop:justify-center">
          {data.slice().sort((a,b) => a.index - b.index).map(v => (
            <HeaderCard data={v} key={v.id} />
          ))}
        </div>
      </>
  )
}

export default Header

