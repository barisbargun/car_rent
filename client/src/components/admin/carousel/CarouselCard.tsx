import { CarouselForm, OpenDialog, ToastMessage } from "@/components";
import { AspectRatio, Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui";
import { PATH_LIST } from "@/constants/enum";
import { _useMutation } from "@/lib/actions";
import Loader from "@/svg/Loader";
import { CheckIcon, TrashIcon, UpdateIcon } from "@radix-ui/react-icons";

import { useMemo } from "react";

type Props = {
  data: ICarousel;
  handleSwap: (id: number) => void;
  swapValue: number | undefined;
}

const CarouselCard = ({ data, handleSwap, swapValue }: Props) => {
  const { mutateAsync, isPending, isSuccess } =
    _useMutation({ models: "CAROUSEL", methodType: "DELETE", id: data.id });
  const toastMessage = ToastMessage();

  const handleDelete = async () => {
    try {
      await mutateAsync({ path: `${PATH_LIST.CAROUSEL}/${data.id}` });
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

  const values = useMemo((): { label: string, name: string | undefined }[] | undefined => {
    if (data) {
      return [
        { label: "Title", name: data?.title },
        { label: "Description", name: data?.desc },
        { label: "Vehicle name", name: data?.vehicle_name },
        { label: "Engine", name: data?.engine },
        { label: "Power", name: data?.power },
        { label: "Price", name: data?.price },
      ]
    }
    return undefined;
  }, [data])

  const getValue = (label: string, name?: string) => {
    return (
      <div>
        <p className="text-sm text-muted-foreground line-clamp-2">{label}</p>
        <small className="text-sm font-medium line-clamp-2">{name || "undefined"}</small>
      </div>
    )
  }

  return (

    <AspectRatio ratio={16 / 9} className="flex-center ">

      <img loading="lazy" src={getImage || ""} alt="image" className="rounded-md max-h-full max-w-full" />
      <div className="absolute top-1 right-1 flex items-start gap-2 z-10 scale-75 mr-[-20px]">
        <OpenDialog
          dialogProps=
          {{
            buttonText: "Edit",
            buttonTextVisible: true,
            title: "Update",
            desc: "Update carousel for your website.",
            width: "w-[500px]"
          }}>
          <CarouselForm type={"UPDATE"} data={data} />
        </OpenDialog>

        <Button variant="outline" disabled={isSuccess || isPending} size="icon" onClick={handleDelete}>
          {(isPending || isSuccess) ? <Loader /> : <TrashIcon className="size-5" />}</Button>

        <Button variant="outline" disabled={swapValue == data.index} size="icon" onClick={() => handleSwap(data.index)}>
          {swapValue == data.index ? <CheckIcon className="size-5" /> : <UpdateIcon className="size-5" />}
        </Button>
      </div>

      <span className="max-desktop:hidden">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="absolute w-full h-full top-0 left-0"></div>
          </HoverCardTrigger >

          <HoverCardContent className="w-72">
            <ul>
              {values?.map(v => (
                <li key={v.label} className="mt-2">{getValue(v.label, v.name)}</li>
              ))}
            </ul>
          </HoverCardContent>
        </HoverCard >
      </span>
    </AspectRatio>


  )
}

export default CarouselCard