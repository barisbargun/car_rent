import { useMemo } from "react"

type Props = {
  data: IReview
}

const colors = ["to-slate-200", "to-pink-200", "to-blue-200", "to-lime-200", "to-yellow-200"]
const ReviewCard = ({ data }: Props) => {

  const getAvatar = useMemo(() => {
    let url: any = data.img?.imgUrl;
    if (url) {
      url = url.split("/image/upload/");
      url = `${url[0]}/image/upload/w_55,h_55,c_lfill/${url[1]}`;
    }
    return url;
  }, [data?.img?.imgUrl])
  return (
    <div className={"bg-gradient-to-br from-white p-6 rounded-md w-[500px] h-[240px] max-md:h-[300px] overflow-hidden " +
      (colors[(data.index - 1) % colors.length])}
    >
      <div className="flex items-center gap-4">
        <div>
          <img src={getAvatar} alt="person-img" width={55} height={55} className="rounded-full" />
        </div>
        <div>
          <h4 className="text-md font-medium leading-none">{data.fullname}</h4>
          <p className="text-xs text-muted-foreground">{data.occupation}</p>
        </div>
      </div>
      <div>
        <p className="text-sm opacity-90 mt-6 line-clamp-5">
          {data.desc}
        </p>
      </div>
    </div>
  )
}

export default ReviewCard