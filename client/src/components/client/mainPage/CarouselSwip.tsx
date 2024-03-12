type Props = {
  swipeLeft: () => void;
  swipeRight: () => void;
  page: number;
  carouselLength: number;
  getNumber: (n: number) => string | number;
}

const CarouselSwip = ({ swipeLeft, swipeRight, page, carouselLength, getNumber }: Props) => {



  return (
    <>
      <i className={"arrow rotate-[-135deg] " + (page == 1 ? "border-stone-400" : "")} onClick={swipeLeft} />

      <div className="relative">
        <p className={"absolute bottom-0 left-0 text-xl font-bold " + (page == carouselLength ? "text-stone-400" : "")}>
          {page == carouselLength ? getNumber(carouselLength - 1) : getNumber(page)}
        </p>
        <p className={"absolute bottom-0 right-0 text-xl font-bold " + (page != carouselLength ? "text-stone-400" : "")}>
          {carouselLength && getNumber(carouselLength)}
        </p>
        <div className="relative">
          <div className="w-40 h-1 bg-stone-400" />
          <div className="absolute h-1 bg-black top-0 "
            style={{ width: `${100 / carouselLength}%`, left: `${100 / carouselLength * (page - 1)}%` }} />
        </div>
      </div>

      <i className={"arrow rotate-45 " + (page == carouselLength ? "border-stone-400" : "")} onClick={swipeRight} />
    </>
  )
}

export default CarouselSwip