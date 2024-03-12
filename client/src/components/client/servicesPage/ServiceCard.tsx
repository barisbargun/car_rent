import React, { useMemo } from 'react'



const ServiceCard = ({ data }: { data: Omit<IService, "id" | "index"> }) => {

  const getLogo = useMemo(() => {
    let url: any = data.img?.imgUrl;
    if (url) {
      url = url.split("/image/upload/");
      url = `${url[0]}/image/upload/h_80/${url[1]}`;
    }
    return url;
  }, [data?.img?.imgUrl])
  return (
    <div className='flex-center flex-col gap-5 w-52 max-md:w-[70%] text-center'>
      <img src={getLogo || ""} alt='service icon' />
      <div className='h-36 max-md:h-full'>
        <h3 className='text-base font-semibold tracking-tight line-clamp-2 mb-1'>{data.title}</h3>
        <p className='text-sm opacity-70 line-clamp-4'>{data.desc}</p>
      </div>
    </div>
  )
}

export default ServiceCard