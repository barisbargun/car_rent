import { Skeleton } from '@/components/ui'

const SkeletonNavbar = () => {
  return (
    <nav className="fixed bg-black bg-opacity-40 
    top-0 left-0 flex-center w-full z-40 text-white shadow-md">
      <div className="pageWidth flex items-center justify-between max-lg:p-3 max-md:p-2">
        <div className='flex-center gap-4'>
          <Skeleton className='w-10 h-10' />
          <Skeleton className='w-40 h-10' />

        </div>
        <div className="flex-center gap-16 max-lg:hidden">
          {[...Array(3)].map((v, i) => (
            <Skeleton className='w-28 h-10' key={i} />
          ))}
        </div>

        <Skeleton className='lg:hidden w-20 h-10' />

      </div>

    </nav>
  )
}

export default SkeletonNavbar