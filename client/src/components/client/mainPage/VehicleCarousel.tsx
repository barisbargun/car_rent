import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

type Props = {
  data: ICarousel[];
  setRef: React.Dispatch<Slider | null>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const VehicleCarousel = ({ data, setPage, setRef }: Props) => {

  var settings = {
    infinite: true,
    speed: 1000,
    lazyload: true,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    data &&
    <Slider {...settings}
      className=""
      ref={slider => (setRef(slider))}
      afterChange={e => setPage(e + 1)}
    >
      {
        data?.slice().sort((a, b) => a.index - b.index).map(v =>
          <div key={v.id} className="w-screen h-screen relative">

            <img src={v.img.imgUrl || ""} alt="car img" className="object-cover h-screen w-screen opacity-80 " />
            <div className="w-full h-screen absolute top-0 left-0 flex justify-center">

              <div className="pageWidth relative">
                <div className="absolute top-28 max-md:top-20 w-full">
                  <h1 className="w-[700px] max-w-[90%] text-balance uppercase text-5xl max-desktop:text-4xl">{v.title}</h1>
                  <h2 className="headerDesc ">{v.desc}</h2>
                </div>
                <div className="absolute bottom-28 max-desktop:bottom-20 max-sm:hidden flex flex-col">
                  <h1 className="text-4xl desktop:text-5xl 2xl:text-6xl text-balance uppercase">{v.vehicle_name}</h1>
                  <div className="h-1 bg-gradient-to-r from-textColor my-3"></div>
                  <div className="flex gap-8">
                    <div className="max-sm:hidden">
                      <small className="vehicleFeatureLabel">Base Price</small>
                      <p className="vehicleFeature">${v.price}<span className="text-sm">/hour</span></p>
                    </div>
                    <div>
                      <small className="vehicleFeatureLabel">Engine</small>
                      <p className="vehicleFeature">{v.engine}</p>
                    </div>
                    <div>
                      <small className="vehicleFeatureLabel">Horse power</small>
                      <p className="vehicleFeature">{v.power}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </Slider>
  )
}

export default VehicleCarousel