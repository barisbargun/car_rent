import { FooterTabForm, OpenDialog, ToastMessage } from "@/components";
import { AspectRatio, Button } from "@/components/ui";
import { PATH_LIST } from "@/constants/enum";
import { _useMutation } from "@/lib/actions";
import Loader from "@/svg/Loader";
import { CheckIcon, TrashIcon, UpdateIcon } from "@radix-ui/react-icons";

type Props = {
  data: IFooterTab;
  handleSwap: (id: number) => void;
  swapValue: number | undefined;
}

const FooterTabCard = ({ data, handleSwap, swapValue }: Props) => {
  const { mutateAsync, isPending, isSuccess } =
    _useMutation({ models: "FOOTER_TAB", methodType: "DELETE", id: data.id });

  const toastMessage = ToastMessage();

  const handleDelete = async () => {
    try {
      await mutateAsync({ path: `${PATH_LIST.FOOTER_TAB}/${data.id}` });
      toastMessage({ defaultText: "delete" });
    } catch (error: any) {
      toastMessage({ defaultText: "error", description: error });
    }
  }


  return (
    <AspectRatio ratio={16 / 9} className="flex-center border-2 dark:border-neutral-800">
      <h2 className="px-4 line-clamp-4 break-words" title={data.title}>{data.title}</h2>

      <div className="absolute top-1 right-1 flex items-start gap-2 scale-75 mr-[-18px]">
        <OpenDialog
          dialogProps=
          {{
            buttonText: "Edit",
            buttonTextVisible: true,
            title: "Update",
            desc: "Update Footer Tab",
            width: "w-[500px]"
          }}>
          <FooterTabForm type={"UPDATE"} data={data} />
        </OpenDialog>

        <Button variant="outline" disabled={isSuccess || isPending} size="icon" onClick={handleDelete}>
          {(isPending || isSuccess) ? <Loader /> : <TrashIcon className="size-5" />}</Button>

        <Button variant="outline" disabled={swapValue == data.index} size="icon" onClick={() => handleSwap(data.index)}>
          {swapValue == data.index ? <CheckIcon className="size-5" /> : <UpdateIcon className="size-5" />}
        </Button>
      </div>
    </AspectRatio>
  )
}

export default FooterTabCard