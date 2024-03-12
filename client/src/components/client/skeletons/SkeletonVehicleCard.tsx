import { Skeleton } from '@/components/ui'

const SkeletonVehicleCard = () => {
  return (
    <div className="flex flex-col col-span-1">
      <Skeleton className='w-full h-40' />
      <div className='flex justify-between w-full h-10 gap-4 mt-2'>
        <Skeleton className='flex-1 h-full' />
        <Skeleton className='w-[20%] h-full' />
      </div>
      <div className='flex justify-between w-full h-10 gap-4 mt-2'>
        <Skeleton className='w-10 h-full' />
        <Skeleton className='w-10 h-full' />
        <Skeleton className='w-10 h-full' />
      </div>
    </div>
  )
}

export default SkeletonVehicleCard