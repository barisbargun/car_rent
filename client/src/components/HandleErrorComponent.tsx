import { errorComponentList } from "@/constants";

const HandleErrorComponent = () => {

  return (
    <div className='justify-center'>
      <div className=''>
        <h3 className='scroll-m-10 text-2xl font-semibold tracking-tight'>{errorComponentList.default.title}</h3>
        <p className='leading-7 [&:not(:first-child)]:mt-2'>{errorComponentList.default.desc}</p>
      </div>
    </div>

  )
}

export default HandleErrorComponent