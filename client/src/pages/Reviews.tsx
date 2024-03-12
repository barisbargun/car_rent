import { Header, ReviewCard } from '@/components';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui';
import { useGetReview } from '@/lib/data';
import { IHeader } from '@/types/exports';

type Props = {
  header?: IHeader
}

const Reviews = ({ header }: Props) => {
  const { data: reviewData, isSuccess: reviewSuccess } = useGetReview();


  return (
    reviewSuccess &&
    <div className='flex-center flex-col py-14 w-full z-10' id='review'>
      <span className='pageWidth py-0'>
        <Header header={header} defaultTitle='Client Reviews' />
      </span>


      <Carousel className="w-full mt-10">
        <CarouselContent className='md:w-[2100px]'>
          <CarouselItem className='max-md:hidden md:carouselItem'></CarouselItem>
          {
            reviewData.slice().sort((a, b) => a.index - b.index).map(v => (
              <CarouselItem className='carouselItem flex-center' key={v.id}>
                <ReviewCard data={v} />
              </CarouselItem>
            ))
          }
          <CarouselItem className='md:carouselItem basis-0'></CarouselItem>
        </CarouselContent>
        <CarouselNext className='right-5 lg:right-10 carouselBtn' />
        <CarouselPrevious className='left-5 lg:left-10 carouselBtn' />
      </Carousel>
    </div>
  )
}

export default Reviews