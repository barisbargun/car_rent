import { ToastMessage, PageLoader, OpenDialog, FooterLinkCards, FooterLinkForm } from "@/components"
import MaxCountComp from "@/components/MaxCountComp";
import { maxCountsBySection } from "@/constants";
import { _useMutation } from "@/lib/actions";
import { useGetFooterTab } from "@/lib/data";
import { useEffect, useMemo } from "react";

const FooterLink = () => {
  const { data, isPending, isSuccess, isError } = useGetFooterTab();
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
  return (
    isPending ? <PageLoader text="Footer links loading.." /> : isSuccess &&
      <>
        <div className="flex gap-8 w-fit">
          {data.slice().sort((a,b) => a.index - b.index).map(v => v?.children?.length > 0 && (
            <FooterLinkCards data={v} key={v.id} />
          ))}
        </div>

        {/** Add button */}
        {getCounts < maxCountsBySection.footerLink &&
          <div className="fixed right-10 bottom-6 z-[99]">
            <OpenDialog
              dialogProps=
              {{
                buttonText: "Add footer link",
                title: "Add a footer link",
                desc: "Add a new footer link for your website.",
                width: "w-[500px]"
              }}>
              <FooterLinkForm type={"CREATE"} />
            </OpenDialog>
          </div>
        }
        <MaxCountComp count={getCounts} type="default" />
      </>
  )
}

export default FooterLink