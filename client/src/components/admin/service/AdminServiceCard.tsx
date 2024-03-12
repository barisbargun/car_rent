import { OpenDialog, ServiceForm } from "@/components";
import { AspectRatio } from "@/components/ui";
import { _useMutation } from "@/lib/actions";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useMemo } from "react";

type Props = {
  data: IService;
  direction?: string;
}

const AdminServiceCard = ({ data, direction }: Props) => {

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
      <div className="w-full flex-center justify-between">
        {direction && <p className="flex-1 text-sm text-muted-foreground px-2">{direction}</p>}
        <span className="scale-75">
          <OpenDialog
            dialogProps=
            {{
              buttonText: "Edit",
              buttonIconType: "EDIT",
              title: "Update",
              desc: "Update Service for your website.",
              width: "w-[500px]"
            }}>
            <ServiceForm type={"UPDATE"} data={data} />
          </OpenDialog>
        </span>

      </div>

      <img loading="lazy" src={getImage || ""} alt="image"  className="rounded-md h-[64px]" />

      <div className="flex-center flex-col gap-2 text-center p-2">
        <small className="text-sm font-medium line-clamp-2" title={data.title}>{data.title}</small>
        <p className="text-sm text-muted-foreground line-clamp-3" title={data.desc}>{data.desc}</p>
      </div>
    </div>
  )
}

export default AdminServiceCard