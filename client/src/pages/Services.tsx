import { Header, ServiceCard } from '@/components';
import { useGetService, useGetSiteValue } from '@/lib/data'
import { IHeader } from '@/types/exports';
import { useMemo } from 'react';

type Props = {
  header?: IHeader;
}

const Service = ({ header }: Props) => {
  const { data: serviceData, isSuccess: serviceSuccess } = useGetService();
  const { data: siteData, isSuccess: siteSuccess } = useGetSiteValue();

  const getData = useMemo(() => serviceData?.slice().sort((a, b) => a.index - b.index), [serviceData])

  const getLogo = useMemo(() => {
    let url: any = siteData && siteData[0].serviceImg?.imgUrl;
    if (url) {
      url = url.split("/image/upload/");
      url = `${url[0]}/image/upload/w_400,h_400,c_lfill/${url[1]}`;
    }
    return url;
  }, [siteData])

  return (
    serviceSuccess && siteSuccess &&
    <div className='flex-center flex-col py-14 pageWidth' id='service'>
      <Header header={header} defaultTitle='Our Services'/>
      <img src={getLogo || ""} className='max-md:hidden lg:absolute z-10 max-lg:mb-10 mt-6' />
      <div className='flex-center flex-col gap-10 w-full mt-10'>
          <div className='flex max-md:flex-col max-md:gap-10 items-center justify-around xl:justify-evenly w-full'>
            {getData?.slice(0, 2).map(v => (
              <ServiceCard data={v} key={v.id}/>
            ))}
          </div>
          <div className='flex max-md:flex-col max-md:gap-10 items-center justify-between xl:justify-around w-full gap-40'>
            {getData?.slice(2, 4).map(v => (
              <ServiceCard data={v} key={v.id}/>
            ))}
          </div>
          <div className='flex-center w-full'>
            {getData?.slice(4, 5).map(v => (
              <ServiceCard data={v} key={v.id}/>
            ))}
          </div>
      </div>
    </div >

  )
}

export default Service