import { OpenDialog, ReviewForm, ToastMessage } from "@/components";
import { Button } from "@/components/ui";
import { PATH_LIST } from "@/constants/enum";
import { _useMutation } from "@/lib/actions";
import Loader from "@/svg/Loader";
import { CheckIcon, TrashIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";

type Props = {
  data: IReview;
  handleSwap: (id: number) => void;
  swapValue: number | undefined;
}

const AdminReviewCard = ({ data, handleSwap, swapValue }: Props) => {
  const { mutateAsync, isPending, isSuccess } =
    _useMutation({ models: "REVIEW", methodType: "DELETE", id: data.id });

  const toastMessage = ToastMessage();

  const handleDelete = async () => {
    try {
      await mutateAsync({ path: `${PATH_LIST.REVIEW}/${data.id}` });
      toastMessage({ defaultText: "delete" });
    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }
  }

  const getImage = useMemo(() => {
    let url: any = data?.img?.imgUrl;
    if (url) {
      url = url.split("/image/upload/");
      url = `${url[0]}/image/upload/w_64,h_64,c_lfill/${url[1]}`;
    }
    return url;
  }, [data?.img?.imgUrl])


  return (
    <div className="card">
      <div className="flex items-start gap-2 z-20 w-full pl-1">
        <p className="flex-1 text-sm text-muted-foreground mt-1 line-clamp-2" title={data.occupation}>{data.occupation}</p>
        <span className="scale-75 mr-[-5px]">
          <OpenDialog
            dialogProps=
            {{
              buttonText: "Edit",
              buttonIconType: "EDIT",
              title: "Update",
              desc: "Update Review for your website.",
              width: "w-[500px]"
            }}>
            <ReviewForm type={"UPDATE"} data={data} />
          </OpenDialog>
          <Button variant="outline" disabled={isSuccess || isPending} size="icon" onClick={handleDelete}>
            {(isPending || isSuccess) ? <Loader /> : <TrashIcon className="size-5" />}</Button>
          <Button variant="outline" disabled={swapValue == data.index} size="icon" onClick={() => handleSwap(data.index)}>
            {swapValue == data.index ? <CheckIcon className="size-5" /> : <UpdateIcon className="size-5" />}
          </Button>
        </span>

      </div>

      <img loading="lazy" src={getImage || ""} alt="image" className="rounded-md h-[64px]" />

      <div className="flex-center flex-col gap-2 text-center px-4">
        <small className="text-sm font-medium line-clamp-3 break-all" title={data.fullname}>{data.fullname}</small>
        <p className="text-sm text-muted-foreground line-clamp-3 break-words" title={data.desc}>{data.desc}</p>
      </div>
    </div>
  )
}

export default AdminReviewCard