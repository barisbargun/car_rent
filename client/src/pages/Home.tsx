import { CustomErrorComponent, Navbar } from "@/components";
import { Footer, Main, Explore, Reviews, Services, Subscribe } from ".";
import { useCallback } from "react";
import { useGetAllValue } from "@/lib/data";
import { PAGE_LIST } from "@/constants/enum";
import { Button } from "@/components/ui";

const Home = () => {
  const { data, isSuccess, isError, refetch } = useGetAllValue();

  const getHeader = useCallback(
    (index: number) => data?.header?.find((v) => v.index == index),
    [data?.header]
  );

  return isSuccess && data ? (
    <div className="backgroundPattern text-textColor">
      <Navbar
        navImg={data.site_value && data.site_value[0].navImg}
        navName={data.site_value && data.site_value[0].navName}
        navData={data.nav_item}
      />
      <main className="w-screen min-h-screen flex flex-col items-center">
        <Main data={data.carousel} />
        <Explore
          data={data.menubar_tab}
          header={getHeader(PAGE_LIST.EXPLORE)}
        />
        <Services
          services={data.service}
          serviceImg={data.site_value[0]?.serviceImg}
          header={getHeader(PAGE_LIST.SERVICE)}
        />
        <Subscribe />
        <Reviews header={getHeader(PAGE_LIST.REVIEW)} data={data.review} />
        <Footer
          logo={data.site_value && data.site_value[0].logoImg}
          desc={data.site_value && data.site_value[0].footerDesc}
          data={data.footer_tab}
        />
      </main>
    </div>
  ) : (
    isError && (
      <span className="absolute desktop:bottom-5 desktop:right-5 p-4 rounded-md bg-destructive/100 text-white max-w-full max-desktop:top-2 max-desktop:left-2 max-desktop:mr-2">
        <CustomErrorComponent />
        <Button
          variant="outline"
          className="text-black mt-2"
          onClick={() => {
            refetch();
          }}
        >
          Refetch
        </Button>
      </span>
    )
  );
};

export default Home;
