import { OpenDialog, ToastMessage, VehicleForm } from "@/components";
import { AspectRatio, Button } from "@/components/ui";
import { PATH_LIST } from "@/constants/enum";
import { _useMutation } from "@/lib/actions";
import Loader from "@/svg/Loader";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";

type Props = {
  data: IVehicle;
}

const AdminVehicleCard = ({ data }: Props) => {
  const { mutateAsync, isPending, isSuccess } =
    _useMutation({ models: "VEHICLE", methodType: "DELETE", id: data.id });
  const toastMessage = ToastMessage();

  const handleDelete = async () => {
    try {
      await mutateAsync({ path: `${PATH_LIST.VEHICLE}/${data.id}` });
      toastMessage({ defaultText: "delete" });
    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }
  }

  const getImage = useMemo(() => {
    let url: any = data?.img?.imgUrl;
    if (url) {
      url = url.split("/image/upload/");
      url = `${url[0]}/image/upload/h_120,c_lfill/${url[1]}`;
    }
    return url;
  }, [data?.img?.imgUrl])


  return (
    <AspectRatio ratio={16 / 9} className="flex-center">
      <div className="flex-center flex-col border-4 w-full h-full p-4">
        <img loading="lazy" src={getImage || ""} alt="image" className="rounded-md max-h-full max-w-full h-[80%]" />
        <h4 className="text-sm line-clamp-1">{data.title}</h4>
      </div>


      <div className="absolute top-1 right-1 flex items-start gap-2 z-20 scale-75 mr-[-15px]">
        <OpenDialog
          dialogProps=
          {{
            buttonText: "Edit",
            buttonTextVisible: true,
            title: "Update",
            desc: "Update vehicle for your website.",
            width: "w-[500px]"
          }}>
          <VehicleForm type={"UPDATE"} data={data} />
        </OpenDialog>

        <Button variant="outline" disabled={isSuccess || isPending} size="icon" onClick={handleDelete}>
          {(isPending || isSuccess) ? <Loader /> : <TrashIcon className="size-5" />}</Button>
      </div>
    </AspectRatio>
  )
}

export default AdminVehicleCard