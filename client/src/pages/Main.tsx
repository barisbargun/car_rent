import { CarouselSwip, VehicleCarousel } from "@/components";
import { useCallback, useMemo, useState } from "react";
import Slider from "react-slick";

type Props = {
  data:ICarousel[]
}

const Main = ({data}:Props) => {

  const [ref, setRef] = useState<Slider | null>(null);
  const [page, setPage] = useState(1);

  const carouselLength = useMemo(() => { return data?.length || 0 }, [data?.length]);

  const getNumber = useCallback((n: number) => {
    if (n) {
      if (n < 10) return `0${n}`
      return n;
    }
    return 0
  }, [data])

  const swipeLeft = () => {
    ref?.slickPrev();
  }

  const swipeRight = () => {
    ref?.slickNext();
  }

  return (
    data &&
      <div className="relative w-full h-full">

        <VehicleCarousel data={data} setPage={setPage} setRef={setRef} />

        <div className="absolute bottom-20 right-20 flex-center max-lg:hidden">
          <CarouselSwip swipeLeft={swipeLeft} swipeRight={swipeRight} page={page} carouselLength={carouselLength} getNumber={getNumber} />
        </div>
      </div>
  )
}

export default Main