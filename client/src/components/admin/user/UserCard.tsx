import { OpenDialog, ProfileForm, ToastMessage } from "@/components";
import { Button } from "@/components/ui";
import { roleListNames } from "@/constants";
import { PATH_LIST } from "@/constants/enum";
import { _useMutation } from "@/lib/actions";
import Loader from "@/svg/Loader";
import { IUser } from "@/types/exports";
import { TrashIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";

type Props = {
  data: IUser;
}

const UserCard = ({ data }: Props) => {

  const { mutateAsync, isPending, isSuccess } =
    _useMutation({ models: "USER", methodType: "DELETE", id: data.id });

  const toastMessage = ToastMessage();

  const handleDelete = async () => {
    try {
      await mutateAsync({ path: `${PATH_LIST.USER}/${data.id}` });
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

  const getRoleName = useMemo(() => {
    return roleListNames[data.role];
  }, [data.role])


  return (
    data &&
    <div className="card">
      <div className="flex items-start gap-2 z-20 w-full pl-1">
        <p className="flex-1 text-sm text-muted-foreground mt-2 line-clamp-2" title={getRoleName}>{getRoleName}</p>
        <span className="scale-75 mr-[-5px]">
          <Button variant="outline" disabled={isSuccess || isPending} size="icon" onClick={handleDelete}>
            {(isPending || isSuccess) ? <Loader /> : <TrashIcon className="size-5" />}</Button>
          <OpenDialog
            dialogProps=
            {{
              buttonText: "Edit",
              buttonIconType: "EDIT",
              title: "Update",
              desc: "Update Review for your website.",
              width: "w-[500px]"
            }}>
            <ProfileForm type={"UPDATE"} data={data} />
          </OpenDialog>
        </span>

      </div>

      <img loading="lazy" src={getImage || ""} alt="image" className="rounded-md" />

      <div className="flex-center flex-col gap-2 text-center px-4">
        <small className="text-sm font-medium line-clamp-3 break-all" title={data.username}>{data.username}</small>
        <p className="text-sm text-muted-foreground line-clamp-3 break-words" title={data.email}>{data.email}</p>
      </div>
    </div>
  )
}

export default UserCard