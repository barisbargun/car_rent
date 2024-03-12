import { errorComponentList } from "@/constants";

type Props = {
  type?: errorComponent;
}

const CustomErrorComponent = ({ type }: Props) => {

  return (
    <div className='justify-center'>
      <div className=''>
        <h3 className='scroll-m-10 text-2xl font-semibold tracking-tight'>{type ? errorComponentList[type].title : errorComponentList.default.title}</h3>
        <p className='leading-7 [&:not(:first-child)]:mt-2'>{type ? errorComponentList[type].desc : errorComponentList.default.desc}</p>
      </div>
    </div>

  )
}

export default CustomErrorComponent