import { useMemo } from 'react';

type Props = {
  data: IVehicle;
}
const VehicleCard = ({ data }: Props) => {

  const getImg = useMemo(() => {
    let url: any = data.img?.imgUrl;
    if (url) {
      url = url.split("/image/upload/");
      url = `${url[0]}/image/upload/h_150,c_lfill/${url[1]}`;
    }
    return url;
  }, [data?.img?.imgUrl])

  return (
    <div className="flex-center flex-col p-4 gap-4 shadow-lg cursor-pointer sm:hover:scale-110 transition-transform">
      <img src={getImg || ""} alt='vehicle' className='object-cover w-fit' />
      <h4 className='text-xl w-full line-clamp-2'>{data.title}</h4>
      <div className='flex justify-between w-full h-10 gap-4 mt-2'>
        <div className='flex-center flex-col w-28'>
          <img src='/assets/icons/steering.svg' alt='steering-icon' className='w-[20px] h-[20px]'/>
          <p className='text-xs md:text-sm'>{data.wheel}</p>
        </div>
        <div className='flex-center flex-col w-28'>
          <img src='/assets/icons/awd.svg' alt='awd-icon'  className='w-[20px] h-[20px]'/>
          <p className='text-xs md:text-sm'>{data.drivetrain}</p>
        </div>
        <div className='flex-center flex-col w-28'>
          <img src='/assets/icons/fuel.svg' alt='fuel-icon'  className='w-[20px] h-[20px]'/>
          <p className='text-xs md:text-sm'>{data.fuel}<span className='text-[10px] md:text-xs opacity-60'>/mpg</span></p>
        </div>
      </div>
    </div>
  )
}

export default VehicleCard