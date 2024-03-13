import { HandleAlert, ToastMessage } from "@/components";
import { Button } from "@/components/ui";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { _useMutation } from "@/lib/actions";
import Loader from "@/svg/Loader";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import { PATH_LIST } from "@/constants/enum"
type Props = {
  image: IImage;
}

const ImageCard = ({ image }: Props) => {

  const { mutateAsync, isPending, isSuccess } =
    _useMutation({ models: "IMAGE", methodType: "DELETE", id: image.id });
  const toastMessage = ToastMessage();

  const handleDelete = async () => {
    try {
      await mutateAsync({ path: `${PATH_LIST.IMAGE}/${image.id}` });
      toastMessage({ defaultText: "deletedImage" });
    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }
  }

  const getImage = useMemo(() => {
    let url: any = image?.imgUrl;
    if (url) {
      url = url.split("/image/upload/");
      url = `${url[0]}/image/upload/w_500,c_lfill/${url[1]}`;
    }
    return url;
  }, [image?.imgUrl])

  return (
    <AspectRatio ratio={16 / 9} className="flex-center bg-slate-300 dark:bg-slate-950 bg-opacity-50 shadow-xl rounded-lg ">

      <img loading="lazy" src={getImage || ""} alt="image" className="rounded-md max-h-full max-w-full" />
      <HandleAlert trigger={handleDelete}>
        <Button variant="outline" disabled={isSuccess || isPending} size="icon" className="absolute top-1 right-1">
          {(isPending || isSuccess) ? <Loader /> : <TrashIcon className="size-5" />}
        </Button>
      </HandleAlert>

    </AspectRatio>
  )
}

export default ImageCard