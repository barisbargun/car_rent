import { CarouselSwip, PageLoader, VehicleCarousel } from "@/components";
import { useGetCarousels } from "@/lib/data"

import { useCallback, useMemo, useState } from "react";
import Slider from "react-slick";

const Main = () => {
  const { data: carouselData, isSuccess, isPending } = useGetCarousels();

  const [ref, setRef] = useState<Slider | null>(null);
  const [page, setPage] = useState(1);

  const carouselLength = useMemo(() => { return carouselData?.length || 0 }, [carouselData?.length]);

  const getNumber = useCallback((n: number) => {
    if (n) {
      if (n < 10) return `0${n}`
      return n;
    }
    return 0
  }, [carouselData])

  const swipeLeft = () => {
    ref?.slickPrev();
  }

  const swipeRight = () => {
    ref?.slickNext();
  }

  return (
    isPending ? <PageLoader text="Page Loading.." color="WHITE"/> : isSuccess &&
      <div className="relative w-full h-full">

        <VehicleCarousel data={carouselData} setPage={setPage} setRef={setRef} />

        <div className="absolute bottom-20 right-20 flex-center max-lg:hidden">
          <CarouselSwip swipeLeft={swipeLeft} swipeRight={swipeRight} page={page} carouselLength={carouselLength} getNumber={getNumber} />
        </div>
      </div>
  )
}

export default Main