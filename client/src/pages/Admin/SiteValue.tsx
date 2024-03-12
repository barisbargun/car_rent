import { ToastMessage, PageLoader } from "@/components"
import SiteValueForm from "@/components/admin/siteValue/SiteValueForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { _useMutation } from "@/lib/actions";
import { useGetSiteValue } from "@/lib/data"
import { useEffect } from "react";

const SiteValue = () => {
  const { data, isPending, isSuccess, isError, error } = useGetSiteValue();

  const toastMessage = ToastMessage();

  useEffect(() => {
    if (isError) {
      toastMessage({ defaultText: "error", description: error });
    }
  }, [isError])


  return (
    isPending ? <PageLoader text="Site values loading.." /> : isSuccess &&
      <Card className="flex flex-wrap w-[400px] max-desktop:w-[95%] bg-background">
        <CardHeader>
          <CardTitle>Site Values</CardTitle>
          <CardDescription>Update site values</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <SiteValueForm data={data[0]} />
        </CardContent>
      </Card>
  )
}

export default SiteValue

