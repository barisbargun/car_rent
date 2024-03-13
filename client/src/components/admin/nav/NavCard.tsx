import { NavForm, OpenDialog, ToastMessage } from "@/components";
import { Button } from "@/components/ui";
import { pageListNames } from "@/constants";
import { PAGE_LIST, PATH_LIST } from "@/constants/enum";
import { _useMutation } from "@/lib/actions";
import Loader from "@/svg/Loader";
import { INavItem } from "@/types/exports";
import { CheckIcon, TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";

type Props = {
  data: INavItem;
  handleSwap: (id: number) => void;
  swapValue: number | undefined;
}

const NavCard = ({ data, handleSwap, swapValue }: Props) => {
  const { mutateAsync, isPending, isSuccess } =
    _useMutation({ models: "NAV_ITEM", methodType: "DELETE", id: data.id });

  const toastMessage = ToastMessage();

  const handleDelete = async () => {
    try {
      await mutateAsync({ path: `${PATH_LIST.NAV_ITEM}/${data.id}` });
      toastMessage({ defaultText: "delete" });
    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }
  }

  const GetHyperLinkName = useMemo(() => {
    const link = data?.hyperLink
    if (link != undefined)
      return link == PAGE_LIST.NO ? "No Link" : "For " + pageListNames[link];
  }, [data.hyperLink]);

  return (
    <div className="card h-32">
      <div className="flex items-start gap-2 w-full pl-1">
        {
          typeof data.hyperLink == "number" &&
          <p className="flex-1 text-xs text-muted-foreground mt-1 line-clamp-2" title={GetHyperLinkName}>{GetHyperLinkName}</p>
        }
        <span className="scale-75 mr-[-8px] gap-2 mt-[-5px]">
          <Button variant="outline" disabled={isSuccess || isPending} size="icon" onClick={handleDelete}>
            {(isPending || isSuccess) ? <Loader /> : <TrashIcon className="size-5" />}</Button>

          <OpenDialog
            dialogProps=
            {{
              buttonText: "Edit",
              buttonIconType: "EDIT",
              title: "Update",
              desc: "Update nav items for your website.",
              width: "w-[500px]"
            }}>

            <NavForm type={"UPDATE"} data={data} />
          </OpenDialog>
          <Button disabled={swapValue == data.index} variant="outline" size="icon" className="ml-1" onClick={() => handleSwap(data.index)}>
            {swapValue == data.index ? <CheckIcon className="size-5" /> : <UpdateIcon className="size-5" />}
          </Button>
        </span>

      </div>

      <div className="flex-center flex-col gap-2 text-center px-4 pt-3">
        <small className="text-sm font-medium line-clamp-3 break-all" title={data.title}>{data.title}</small>
      </div>
    </div>
  )
}

export default NavCard