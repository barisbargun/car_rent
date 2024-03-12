import { MenubarVehicleForm, OpenDialog, ToastMessage } from "@/components";
import { AspectRatio, Button } from "@/components/ui";
import { PATH_LIST } from "@/constants/enum";
import { _useMutation } from "@/lib/actions";
import Loader from "@/svg/Loader";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";

type Props = {
  data: IMenubarVehicle;
}

const MenubarTabCard = ({ data }: Props) => {
  const { mutateAsync, isPending, isSuccess } =
    _useMutation({ models: "MENUBAR_VEHICLE", methodType: "DELETE", id: data.id });
  const toastMessage = ToastMessage();

  const handleDelete = async () => {
    try {
      await mutateAsync({ path: `${PATH_LIST.MENUBAR_VEHICLE}/${data.id}` });
      toastMessage({ defaultText: "delete" });
    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }
  }

  const getImage = useMemo(() => {
    let url: any = data?.img?.imgUrl;
    if (url) {
      url = url.split("/image/upload/");
      url = `${url[0]}/image/upload/w_500,c_lfill/${url[1]}`;
    }
    return url;
  }, [data?.img?.imgUrl])


  return (
    <AspectRatio ratio={16 / 9} className="flex-center">
      <img loading="lazy" src={getImage || ""} alt="image" className="rounded-md max-h-full max-w-full" />

      <div className="absolute top-1 right-1 flex items-start gap-2 z-20 scale-75 mr-[-15px]">
        <OpenDialog
          dialogProps=
          {{
            buttonText: "Edit",
            buttonTextVisible: true,
            title: "Update",
            desc: "Update menubar vehicle for your website.",
            width: "w-[500px]"
          }}>
          <MenubarVehicleForm type={"UPDATE"} data={data} />
        </OpenDialog>

        <Button variant="outline" disabled={isSuccess || isPending} size="icon" onClick={handleDelete}>
          {(isPending || isSuccess) ? <Loader /> : <TrashIcon className="size-5" />}</Button>
      </div>
    </AspectRatio>
  )
}

export default MenubarTabCard