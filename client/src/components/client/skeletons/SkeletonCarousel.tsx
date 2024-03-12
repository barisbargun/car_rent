import { Skeleton } from '@/components/ui'
import React from 'react'

const SkeletonCarousel = () => {
  return (
    <div className="w-screen h-screen relative">

      <Skeleton className="h-screen w-screen opacity-80 " />
      <div className="w-full h-screen absolute top-0 left-0 flex justify-center">

        <div className="pageWidth relative">
          <div className="absolute top-28 max-md:top-20 w-full">
            <Skeleton className="w-[700px] max-w-[90%] h-40 mb-4" />
            <Skeleton className="w-[550px]  max-w-[70%] h-28 " />
          </div>
          <div className="absolute bottom-28 max-desktop:bottom-20 max-sm:hidden flex flex-col w-full">
            <Skeleton className="w-[60%] max-w-[90%] h-20 mb-4" />
            <div className="flex gap-8 w-full">
              <Skeleton className="w-[12%] h-10" />
              <Skeleton className="w-[12%] h-10" />
              <Skeleton className="w-[12%] h-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCarousel