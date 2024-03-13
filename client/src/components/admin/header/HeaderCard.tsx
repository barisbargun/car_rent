import { OpenDialog } from "@/components";
import { _useMutation } from "@/lib/actions";
import { IHeader } from "@/types/exports";
import HeaderForm from "./HeaderForm";
import { pageListNames } from "@/constants";

type Props = {
  data: IHeader;
}

const HeaderCard = ({ data }: Props) => {
  return (
    <div className="card">
      <div className="flex items-start gap-2 w-full pl-1">
        <p className="flex-1 text-sm text-muted-foreground mt-2 line-clamp-2"
          title={pageListNames[data.index]}>{pageListNames[data.index]}</p>
        <span className="scale-75">
          <OpenDialog
            dialogProps=
            {{
              buttonText: "Edit",
              buttonIconType: "EDIT",
              title: "Update",
              desc: "Update Header for your website.",
              width: "w-[500px]"
            }}>
            <HeaderForm data={data} />
          </OpenDialog>
        </span>

      </div>

      <div className="flex-col gap-2 px-4 mt-2 w-full">
        <div className="mb-4 h-16">
          <p className="text-xs text-muted-foreground line-clamp-3 break-words">Title</p>
          <small className="text-sm font-medium line-clamp-3 break-all" title={data.title}>{data.title}</small>
        </div>
        <div className="h-16">
          <p className="text-xs text-muted-foreground line-clamp-3 break-words">Description</p>
          <small className="text-sm font-medium line-clamp-3 break-all" title={data.desc}>{data.desc}</small>
        </div>
      </div>
    </div>
  )
}

export default HeaderCard