import { FooterTab } from "@/components";
import { useMemo } from "react";

type Props = {
  logo?: IImage;
  desc?: string;
  data: IFooterTab[];
};

const Footer = ({ logo, desc, data }: Props) => {
  const getLogo = useMemo(() => {
    let url: any = logo && logo.imgUrl;
    if (url) {
      url = url.split("/image/upload/");
      url = `${url[0]}/image/upload/w_90,h_90,c_lfill/${url[1]}`;
    }
    return url;
  }, [logo]);
  return (
    data && (
      <div
        className="flex-center py-8 bg-textColor text-white z-10 w-full"
        id="footer"
      >
        <div className="pageWidth flex justify-between gap-20 max-lg:flex-col max-sm:flex-col-reverse">
          <div className="flex justify-center items-center h-fit gap-4 w-[400px] max-xl:w-fit">
            {getLogo && (
              <img
                src={getLogo || ""}
                alt="logo"
                width={90}
                height={90}
                className="rounded-md"
              />
            )}
            <p className="text-xs opacity-60 line-clamp-[8] max-lg:block max-xl:hidden">
              {desc}
            </p>
          </div>
          <div className="flex justify-between w-[50%] max-xl:flex-1 max-lg:w-full max-sm:flex-col max-sm:gap-10 max-md:text-center">
            {data
              .slice()
              .sort((a, b) => a.index - b.index)
              .map((v) => (
                <FooterTab key={v.id} data={v} />
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Footer;
